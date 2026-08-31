"use client";

import { ReactNode } from "react";
// tokens 패키지가 빌드한 CSS 변수(--color-*, --space-*, --radius-*)를 가져와 쓴다.
// 색을 바꾸고 싶으면 이 파일이 아니라 packages/tokens/src/tokens.json만 고치면 된다 —
// 모노레포라 별도 배포/버전업 없이 워크스페이스 안에서 바로 반영된다.
import "@repo/tokens/tokens.css";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  className?: string;
}

const VARIANT_STYLE: Record<NonNullable<ButtonProps["variant"]>, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--color-brand-primary)",
    color: "#fff",
  },
  secondary: {
    backgroundColor: "var(--color-neutral-100)",
    color: "var(--color-neutral-900)",
  },
  danger: {
    backgroundColor: "var(--color-feedback-danger)",
    color: "#fff",
  },
};

export const Button = ({ children, variant = "primary", onClick, className }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={onClick}
      style={{
        ...VARIANT_STYLE[variant],
        padding: "var(--space-sm) var(--space-md)",
        borderRadius: "var(--radius-md)",
        border: "none",
        fontSize: "14px",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};
