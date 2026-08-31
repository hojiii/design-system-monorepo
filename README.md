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
  ui/                  # tokens를 소비하는 React 컴포넌트(Button)
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
pnpm turbo run build   # tokens → ui → web 순서로 빌드(의존 그래프 기반)
pnpm --filter web dev  # http://localhost:3000
```

## 다음에 붙일 것 (아직 안 함)

- **Storybook**: `packages/ui` 컴포넌트 카탈로그/문서화
- **changesets**: 패키지별 버전 관리 + 체인지로그 자동화 (`npx changeset`)
- **Figma Variables 연동**: Figma에서 정의한 토큰을 `tokens.json`에 자동 반영하는 스크립트
