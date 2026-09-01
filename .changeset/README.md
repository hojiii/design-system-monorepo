# Changesets

이 폴더의 마크다운 파일 하나 = "다음 릴리스에 들어갈 변경 하나".

## 쓰는 법

```sh
pnpm changeset            # 대화형으로 변경 파일 생성 (어떤 패키지, major/minor/patch, 요약)
pnpm changeset status     # 아직 릴리스 안 된 변경 목록 확인
pnpm version-packages     # 쌓인 changeset을 소비 → package.json 버전 bump + CHANGELOG.md 갱신
```

`web` 앱은 `config.json`의 `ignore`에 있어 버전 대상이 아니다.
`@repo/tokens`가 bump되면 그걸 의존하는 `@repo/ui`도 자동으로 patch bump된다
(`updateInternalDependencies: "patch"`).

패키지가 전부 `private`이라 `changeset publish`(npm 배포)는 동작하지 않는다.
버전/체인지로그 자동화만 연습하는 구성.

자세한 내용: https://github.com/changesets/changesets
