import type { Preview } from "@storybook/react-vite";

// tokens 패키지가 빌드한 CSS 변수(--color-*, --space-*, --radius-*)를 모든 스토리에 주입한다.
// packages/tokens/src/tokens.json → style-dictionary build 결과가 여기로 들어온다.
import "@repo/tokens/tokens.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
