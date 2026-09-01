// CSS를 side-effect import 할 때(예: button.tsx의 `import "@repo/tokens/tokens.css"`)
// tsc가 모듈을 못 찾아 TS2882로 실패하는 걸 막는다. 번들러(Vite/Next)가 실제 처리하고,
// 타입 관점에서는 값이 없는 모듈로만 선언해 둔다.
declare module "*.css";
