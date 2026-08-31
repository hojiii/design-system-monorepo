// 디자인 토큰(src/tokens.json) 하나를 여러 플랫폼(CSS 변수 / JS·TS 상수)으로 동시에 빌드한다.
// 여기가 바뀌면 이 토큰을 쓰는 packages/ui, apps/web이 같은 저장소 안에서 곧바로 최신 값을 받는다
// — 이게 모노레포로 디자인 시스템을 관리하는 핵심 이점(버전 배포 없이 바로 반영).
export default {
  source: ["src/tokens.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "dist/css/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          options: { selector: ":root" },
        },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: "dist/js/",
      files: [
        { destination: "tokens.js", format: "javascript/es6" },
        { destination: "tokens.d.ts", format: "typescript/es6-declarations" },
      ],
    },
  },
};
