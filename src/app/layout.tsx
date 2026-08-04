import type { Metadata, Viewport } from "next";
import "../styles/globals.css";

const description =
  "Industrial Engineering student at KU Leuven. I build webapps and tools on the side.";

export const metadata: Metadata = {
  metadataBase: new URL("https://flodlol.dev"),
  title: "Jonas | Portfolio",
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "flodlol.dev",
    title: "Jonas | Portfolio",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonas | Portfolio",
    description,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon/site.webmanifest",
};

// Tints the accent stripe on Discord/Slack embeds.
export const viewport: Viewport = {
  themeColor: "#9dacff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
