# @repo/ui

## 0.1.0

### Minor Changes

- f80ac4c: `Card`를 create-turbo 링크 카드 보일러플레이트에서 tokens 기반 표면 컨테이너 컴포넌트로 교체. `title`/`footer` optional slot 지원, 색·간격·라운드는 전부 `--color-*` / `--space-*` / `--radius-*` CSS 변수. 기존 `href` prop 제거(breaking).
- f80ac4c: Storybook 10(react-vite) 카탈로그 추가. `Button`, `Card` 스토리와 `@repo/tokens` CSS 변수를 주입하는 preview 설정 포함. `pnpm --filter @repo/ui storybook` / `build-storybook`.
