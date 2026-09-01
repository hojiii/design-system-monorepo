# Design System Monorepo (연습용)

디자인 시스템을 pnpm + Turborepo 모노레포로 구성하는 걸 손에 익히기 위한 연습 프로젝트.
"토큰이 바뀌면 별도 배포 없이 같은 저장소 안에서 바로 컴포넌트/앱에 반영된다"는 흐름을
최소 구성으로 실제로 동작하게 만들어봤다.

## 구조

```
apps/
  web/                # Next.js 데모 앱 — 버튼/컬러 스와치 보여줌
packages/
  tokens/              # 진짜 소스 오브 트루스. tokens.json 하나 → style-dictionary로
                        # CSS 변수(dist/css/tokens.css) + JS 상수(dist/js/tokens.js) 동시 생성
  ui/                  # tokens를 소비하는 React 컴포넌트(Button) + Storybook 카탈로그
  eslint-config/        # 공용 eslint 설정
  typescript-config/    # 공용 tsconfig
```

## 핵심 흐름

1. `packages/tokens/src/tokens.json`의 색상/간격 값을 고친다.
2. `pnpm turbo run build`(또는 `pnpm --filter @repo/tokens build`)를 돌리면
   `dist/css/tokens.css`, `dist/js/tokens.js`가 다시 생성된다.
3. `packages/ui`의 `Button`은 `var(--color-brand-primary)`처럼 CSS 변수로,
   `apps/web`의 데모 페이지는 `import * as tokens from "@repo/tokens"`로 JS 값을 직접
   가져다 쓴다 — **버전 배포/퍼블리시 없이** 워크스페이스 심볼릭 링크로 바로 최신 값을 본다.

## 실행

```sh
pnpm install
pnpm turbo run build            # tokens → ui → web 순서로 빌드(의존 그래프 기반)
pnpm --filter web dev           # http://localhost:3000
pnpm --filter @repo/ui storybook  # http://localhost:6006 — 컴포넌트 카탈로그
```

## Storybook

`packages/ui`에 Storybook 10(react-vite)을 붙였다.

- `packages/ui/src/*.stories.tsx` — `Button`, `Card` 스토리
- `.storybook/preview.ts`에서 `@repo/tokens/tokens.css`를 주입하므로 스토리도 실제 토큰 값을 그대로 본다.
  `tokens.json`을 고치고 `pnpm --filter @repo/tokens build`만 하면 Storybook에도 바로 반영된다.
- `pnpm --filter @repo/ui storybook` (dev) / `pnpm --filter @repo/ui build-storybook` (정적 빌드 → `storybook-static/`)
- turbo `storybook`/`build-storybook` 태스크는 `@repo/tokens#build`에 의존하도록 걸어둠.

## changesets (버전 관리 + 체인지로그)

`.changeset/`에 changesets를 세팅했다. 변경 파일 하나 = 다음 릴리스에 들어갈 항목 하나.

```sh
pnpm changeset          # 대화형으로 변경 파일 생성 (패키지 선택 → major/minor/patch → 요약)
pnpm changeset status    # 아직 릴리스 안 된 변경 목록
pnpm version-packages    # 쌓인 changeset 소비 → package.json 버전 bump + 각 패키지 CHANGELOG.md 갱신
```

- 모든 패키지가 `private`이라 `.changeset/config.json`에 `privatePackages.version: true`를 명시했다
  (안 하면 `@changesets/config@4`가 private 패키지를 버전 대상에서 제외함).
- `web` 앱은 `ignore`에 넣어 버전 대상 제외.
- `@repo/tokens`가 bump되면 이를 의존하는 `@repo/ui`도 자동 patch bump (`updateInternalDependencies: "patch"`).
- npm 배포는 안 하므로 `changeset publish`는 사용하지 않는다. 버전/체인지로그 자동화만 연습.

지금 `@repo/ui` Storybook 추가에 대한 changeset이 하나 쌓여 있다 (`pnpm changeset status`로 확인 → `pnpm version-packages`로 소비).

## CI (.github/workflows)

- **`ci.yml`** — PR / main push마다 `pnpm turbo run lint check-types build`.
- **`release.yml`** — main에 changeset이 쌓이면 `changesets/action`이 "chore: version packages" PR을
  자동으로 열고/갱신한다. 그 PR을 merge하면 `pnpm version-packages` 결과(버전 bump + CHANGELOG)가
  main에 커밋된다. private 패키지라 npm publish 단계는 없음.

> GitHub remote가 아직 없어서 실제로는 push하면 동작한다. `secrets.GITHUB_TOKEN`은 Actions가 기본 제공.

## 다음에 붙일 것 (아직 안 함)

- **Figma Variables 연동**: Figma에서 정의한 토큰을 `tokens.json`에 자동 반영하는 스크립트
