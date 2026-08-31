import { Button } from "@repo/ui/button";
// style-dictionary의 javascript/es6 포맷은 토큰 경로별로 이름 있는 상수를 내보낸다
// (예: tokens.json의 color.brand.primary → export const ColorBrandPrimary).
// 같은 토큰을 CSS 변수(Button)와 JS 값(이 페이지) 양쪽에서 동시에 쓸 수 있다는 걸 보여주는 예시.
import * as tokens from "@repo/tokens";

const colorSwatches = Object.entries(tokens)
  .filter(([name]) => name.startsWith("Color"))
  .map(([name, value]) => ({ label: name, value: value as string }));

export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Design System Monorepo</h1>
      <p style={{ color: "#6c757d", marginBottom: 40 }}>
        packages/tokens → packages/ui → apps/web 순서로 같은 저장소 안에서 바로 연결됩니다.
      </p>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, marginBottom: 16 }}>Button (tokens 기반)</h2>
        <div style={{ display: "flex", gap: 12 }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 18, marginBottom: 16 }}>Color tokens</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
          {colorSwatches.map(({ label, value }) => (
            <div key={label}>
              <div style={{ height: 48, borderRadius: 8, background: value, border: "1px solid #eee" }} />
              <div style={{ fontSize: 12, marginTop: 4 }}>{label}</div>
              <div style={{ fontSize: 11, color: "#adb5bd" }}>{value}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
