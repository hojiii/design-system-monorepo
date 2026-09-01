import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./button";
import { Card } from "./card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    title: "Card title",
    children:
      "tokens(--color-*, --space-*, --radius-*)를 그대로 쓰는 표면 컨테이너. tokens.json을 고치면 이 스토리도 바로 바뀐다.",
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BodyOnly: Story = {
  args: { title: undefined },
};

export const WithFooter: Story = {
  args: {
    footer: (
      <div style={{ display: "flex", gap: "var(--space-sm)" }}>
        <Button variant="primary">확인</Button>
        <Button variant="secondary">취소</Button>
      </div>
    ),
  },
};
