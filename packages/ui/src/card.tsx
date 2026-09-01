"use client";

import { ReactNode } from "react";
// Button과 동일하게 tokens 패키지가 빌드한 CSS 변수를 그대로 소비한다.
// 색/간격/라운드를 바꾸고 싶으면 이 파일이 아니라 packages/tokens/src/tokens.json을 고친다.
import "@repo/tokens/tokens.css";

interface CardProps {
  children: ReactNode;
  title?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const Card = ({ children, title, footer, className }: CardProps) => {
  return (
    <div
      className={className}
      style={{
        backgroundColor: "var(--color-neutral-50)",
        border: "1px solid var(--color-neutral-100)",
        borderRadius: "var(--radius-md)",
        padding: "var(--space-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-sm)",
      }}
    >
      {title != null && (
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "var(--color-neutral-900)",
          }}
        >
          {title}
        </div>
      )}
      <div style={{ fontSize: 14, lineHeight: 1.5, color: "var(--color-neutral-500)" }}>
        {children}
      </div>
      {footer != null && (
        <div
          style={{
            marginTop: "var(--space-sm)",
            paddingTop: "var(--space-md)",
            borderTop: "1px solid var(--color-neutral-100)",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
};
