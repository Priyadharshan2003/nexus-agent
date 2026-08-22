import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #070b14 0%, #0c162d 50%, #030712 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
          border: "4px solid rgba(56, 189, 248, 0.35)",
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 110,
            height: 110,
            borderRadius: 28,
            background: "linear-gradient(135deg, rgba(0, 112, 242, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)",
            border: "2px solid rgba(56, 189, 248, 0.6)",
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              background: "linear-gradient(135deg, #38bdf8 0%, #0070f2 50%, #818cf8 100%)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-0.06em",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            N
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
