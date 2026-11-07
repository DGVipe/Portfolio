import { ImageResponse } from "next/og";

import { site } from "@/content/site";
import { localize } from "@/lib/i18n/locale";

const role = localize(site.role, "en");

export const alt = `${site.name} — ${role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview: name and role over the hero's brand gradient (hex, since the renderer has no oklch). */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          color: "#ffffff",
          backgroundColor: "#10132c",
          backgroundImage: [
            "radial-gradient(55% 75% at 12% 25%, rgba(38, 70, 152, 0.95), transparent 70%)",
            "radial-gradient(50% 70% at 85% 15%, rgba(248, 160, 82, 0.9), transparent 70%)",
            "radial-gradient(60% 60% at 70% 95%, rgba(226, 73, 71, 0.85), transparent 70%)",
            "radial-gradient(45% 55% at 35% 85%, rgba(149, 52, 144, 0.7), transparent 70%)",
          ].join(", "),
        }}
      >
        <div style={{ fontSize: 112, lineHeight: 1, letterSpacing: -4 }}>{site.name}</div>
        <div style={{ fontSize: 48, marginTop: 24, opacity: 0.85 }}>{role}</div>
        <div style={{ fontSize: 28, marginTop: 48, opacity: 0.7 }}>
          {new URL(site.url).hostname}
        </div>
      </div>
    ),
    size,
  );
}
