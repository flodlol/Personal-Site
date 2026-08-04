import { ImageResponse } from "next/og";
import { heroSkills } from "./content/skills";

export const alt =
  "Jonas — Industrial Engineering student at KU Leuven who builds webapps and tools on the side";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors the hero: dark paper, the same 116deg light streaks, and the
// glass skills strip along the bottom.
const auroraLayers = [
  "linear-gradient(116deg, rgba(8, 8, 8, 0) 6%, rgba(75, 87, 159, 0.34) 21%, rgba(183, 192, 255, 0.12) 30%, rgba(8, 8, 8, 0) 45%)",
  "linear-gradient(116deg, rgba(8, 8, 8, 0) 37%, rgba(56, 68, 132, 0.3) 52%, rgba(199, 206, 255, 0.1) 61%, rgba(8, 8, 8, 0) 76%)",
  "linear-gradient(116deg, rgba(8, 8, 8, 0) 69%, rgba(63, 76, 145, 0.26) 83%, rgba(183, 192, 255, 0.09) 89%, rgba(8, 8, 8, 0) 99%)",
];

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#080808",
          color: "#f2f2f0",
          fontFamily: "sans-serif",
        }}
      >
        {auroraLayers.map((backgroundImage) => (
          <div
            key={backgroundImage}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              backgroundImage,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "58px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#88888c",
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex" }}>flodlol.dev</div>
            <div style={{ display: "flex" }}>Portfolio</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 112,
                lineHeight: 1,
                letterSpacing: -5,
              }}
            >
              <div style={{ display: "flex" }}>Hi, I&apos;m&nbsp;</div>
              <div style={{ display: "flex", color: "#b4bdff" }}>Jonas</div>
            </div>

            <div
              style={{
                marginTop: 30,
                display: "flex",
                flexDirection: "column",
                color: "#a1a1a6",
                fontSize: 31,
                lineHeight: 1.4,
              }}
            >
              <div style={{ display: "flex" }}>
                Industrial Engineering student at KU Leuven.
              </div>
              <div style={{ display: "flex" }}>
                I build webapps and tools on the side.
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "20px 24px",
              backgroundColor: "rgba(14, 14, 20, 0.38)",
              backgroundImage:
                "linear-gradient(108deg, rgba(255, 255, 255, 0.105), rgba(157, 172, 255, 0.055) 58%, rgba(255, 255, 255, 0.025))",
              border: "1px solid rgba(232, 235, 255, 0.2)",
              borderRadius: 18,
            }}
          >
            <div style={{ display: "flex", color: "#88888c", fontSize: 21 }}>
              I like to work with
            </div>

            {heroSkills[0].items.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  padding: "9px 16px",
                  color: "#d1d1d4",
                  fontSize: 21,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.13)",
                  borderRadius: 999,
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
