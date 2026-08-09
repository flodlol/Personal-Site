import type { Metadata, Viewport } from "next";
import "../styles/globals.css";

const GA_MEASUREMENT_ID = "G-9TSXZ3V92H";

const description =
  "Jonas Meuleman, known online as flodlol, is an Industrial Engineering student at KU Leuven who builds webapps and tools on the side — including Study-Track, Hand-Outs, and Statics NVM.";

export const metadata: Metadata = {
  metadataBase: new URL("https://flodlol.dev"),
  title: "Jonas | Portfolio",
  description,
  keywords: [
    "Jonas Meuleman",
    "flodlol",
    "KU Leuven",
    "Industrial Engineering",
    "Study-Track",
    "Hand-Outs",
    "Statics NVM",
    "software developer",
    "web developer",
  ],
  authors: [{ name: "Jonas Meuleman", url: "https://flodlol.dev" }],
  creator: "Jonas Meuleman",
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

// Ties the "Jonas Meuleman" identity to this site and its projects for
// search engines, separate from unrelated online aliases/profiles.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jonas Meuleman",
  alternateName: "flodlol",
  url: "https://flodlol.dev",
  image: "https://flodlol.dev/flod-icon.png",
  description,
  jobTitle: "Industrial Engineering Student & Software Developer",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "KU Leuven",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "KU Leuven",
  },
  sameAs: ["https://github.com/flodlol"],
  knowsAbout: [
    "React",
    "TypeScript",
    "Next.js",
    "Python",
    "Firebase",
    "Automation",
    "Developer Tooling",
  ],
  owns: [
    {
      "@type": "SoftwareApplication",
      name: "Study-Track",
      url: "https://study-track.app",
      applicationCategory: "Productivity",
    },
    {
      "@type": "SoftwareApplication",
      name: "Hand-Outs",
      url: "https://hand-outs.com",
      applicationCategory: "Productivity",
    },
    {
      "@type": "SoftwareApplication",
      name: "Statics NVM",
      url: "https://sterkteleer.flodlol.dev",
      applicationCategory: "EducationalApplication",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {process.env.NODE_ENV === "production" && (
          <script
            id="google-analytics-loader"
            dangerouslySetInnerHTML={{
              __html: `
              (() => {
                let loaded = false;
                const loadAnalytics = () => {
                  if (loaded) return;
                  loaded = true;

                  window.dataLayer = window.dataLayer || [];
                  window.gtag = function(){window.dataLayer.push(arguments);};
                  window.gtag('js', new Date());
                  window.gtag('config', '${GA_MEASUREMENT_ID}');

                  const script = document.createElement('script');
                  script.async = true;
                  script.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
                  document.head.appendChild(script);
                };

                ['click', 'keydown'].forEach((eventName) => {
                  window.addEventListener(eventName, loadAnalytics, {
                    once: true,
                    passive: true,
                  });
                });

              })();
            `,
            }}
          />
        )}
        {children}
      </body>
    </html>
  );
}
