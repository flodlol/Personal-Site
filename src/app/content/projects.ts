export type ProjectLink = {
  href: string;
  label: string;
};

export type ProjectModal = {
  paragraphs?: string[];
  content?: ProjectModalContentBlock[];
  screenshot?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export type ProjectModalContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "sectionTitle";
      text: string;
    }
  | {
      type: "list";
      items: string[];
      ordered?: boolean;
    }
  | {
      type: "carousel";
      label: string;
      images: Array<{
        src: string;
        alt: string;
        width: number;
        height: number;
      }>;
    }
  | {
      type: "embed";
      href: string;
      imgSrc: string;
      alt: string;
      width: number;
      height: number;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
    }
  | {
      type: "imageRow";
      images: Array<{
        src: string;
        alt: string;
        width: number;
        height: number;
      }>;
    };

export type Project = {
  id: string;
  title: string;
  period?: string;
  stack?: string | string[];
  description: string;
  link?: ProjectLink;
  links?: ProjectLink[];
  thumbnail?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  showLogoOnCard?: boolean;
  showLogoInModal?: boolean;
  modal?: ProjectModal;
};

export const currentProjects: Project[] = [
  {
    id: "study-track",
    title: "Study-Track",
    period: "Oktober 2025 - Now",
    stack: "React (Vite) · Firebase · Stripe",
    description:
      "An all-in-one study tracking platform designed to help students understand where their time goes and improve consistency. The project combines automatic schedule syncing, effortless time tracking, and clear data visualizations, with a social layer that keeps users motivated by studying alongside friends.",
    link: { href: "https://study-track.app", label: "Visit study-track.app" },
    logo: {
      src: "/study-track/study-track-logo.png",
      alt: "Study-Track logo",
      width: 240,
      height: 240,
    },
    modal: {
      content: [
        {
          type: "paragraph",
          text: "Study-Track is a study tracking platform I'm building for university students. The idea came from noticing how easy it is to feel busy all day while still having no clear picture of what you actually got done.",
        },
        {
          type: "paragraph",
          text: "It syncs academic schedules automatically, lets you log study sessions without much setup, and turns the data into readable visualizations. There's also a social layer so you can study alongside friends and see their progress, which helps with staying consistent.",
        },
        {
          type: "paragraph",
          text: "I handle everything myself: design, frontend, backend, and the product decisions. It's still growing and I'm shipping new features regularly.",
        },
      ],
    },
  },
  {
    id: "hand-outs",
    title: "Hand-Outs",
    period: "February 2026 - Now",
    stack: "Next.js · TypeScript · PDF.js",
    description:
      "A PDF handout generator that converts slide decks into clean, writeable handouts. Built for taking notes during lectures.",
    links: [
      { href: "https://hand-outs.com", label: "Visit hand-outs.com" },
      {
        href: "https://github.com/flodlol/PDF-Slides-to-Hand-Outs",
        label: "GitHub Repository",
      },
    ],
    logo: {
      src: "/hand-outs/hand-outs-logo.png",
      alt: "Hand-Outs logo",
      width: 1024,
      height: 1024,
    },
    modal: {
      content: [
        {
          type: "paragraph",
          text: "Hand-Outs started as a simple frustration: professors share slide decks as PDFs, but those PDFs aren't built for note-taking. You either print tiny slides with no writing space, or annotate on top of the content and it gets messy fast.",
        },
        { type: "sectionTitle", text: "What it does" },
        {
          type: "list",
          items: [
            "Converts PDF slide decks into handout-style pages.",
            "Lets you choose how many slides appear per page.",
            "Adds writeable space next to each slide for notes.",
            "Exports a clean, print-ready PDF.",
          ],
        },
        { type: "sectionTitle", text: "How it works" },
        {
          type: "list",
          ordered: true,
          items: [
            "Upload a PDF slide deck.",
            "Pick a layout: slides per page, spacing, and note area.",
            "Generate and download the handout.",
          ],
        },
        {
          type: "paragraph",
          text: "Built with Next.js and TypeScript, using PDF.js to read and render the source PDF.",
        },
      ],
    },
  },
];

export const pastProjects: Project[] = [
  {
    id: "tag-timeline",
    title: "Tag-Timeline",
    period: "December 2024 - February 2025",
    stack: "React (Next.js) · Firebase",
    description:
      "A community-driven archive built to document the history of TNT Tag, preserving key moments, updates, and eras in a single, navigable timeline. The project focuses on structure, accuracy, and long-term accessibility rather than fleeting hype.",
    links: [
      {
        href: "https://tagtimeline.com",
        label: "Visit tagtimeline.com",
      },
      {
        href: "https://github.com/flodlol/Tag-History",
        label: "GitHub Repository",
      },
    ],
    logo: {
      src: "/tag-timeline/tag-timeline-logo.png",
      alt: "Tag-Timeline logo",
      width: 240,
      height: 240,
    },
    showLogoOnCard: false,
    modal: {
      paragraphs: [
        "Tag-Timeline is a history and archival project I built to document the evolution of the Minecraft Hypixel minigame TNT Tag, from its earliest days to the present. The idea came from noticing how much of the game's history lived only in scattered videos, forgotten forum posts, and personal memories. I had long stopped playing the game myself, but I was bored one winter break and thought it would be fun to try make this project.",
        "The platform organizes events, updates, community milestones, and eras into a clear chronological timeline, making it easy to explore how the game and its community developed over time. The focus is on clarity and structure, turning fragmented information into something coherent and searchable.",
        "Beyond official updates, TagTimeline also highlights community-driven moments such as guilds, creators, rivalries, and undocumented phases that shaped the game's culture but are often overlooked. It had everything from detailed event descriptions to visual media and links to original sources.",
        "I never finished the project. The coding part was about 90% done, but I got stuck on gathering and verifying all the historical information, that was just a little too boring for me. Overall, it was a great learning experience in structuring data, something I had never done before at that scale.",
      ],
      screenshot: {
        src: "/tag-timeline/home-page.png",
        alt: "Tag-Timeline homepage screenshot",
        width: 2940,
        height: 1476,
      },
    },
  },
];

export const smallerPythonProjects: Project[] = [
  {
    id: "reel-generator",
    title: "Reel-Generator",
    period: "August 2024",
    stack: "Python",
    description:
      "A small Python project for generating quick, meme-style reels with minimal setup. Built for speed and iteration when you just want to ship something.",
    link: {
      href: "https://github.com/flodlol/Reel-Generator",
      label: "View on GitHub",
    },
    logo: {
      src: "/reel-generator/reel-generator-logo.png",
      alt: "Reel-Generator logo",
      width: 1024,
      height: 1024,
    },
    modal: {
      content: [
        {
          type: "paragraph",
          text: "Reel-Generator is a small Python tool I built to generate quick, meme-style reels with minimal setup. It's aimed at the \"I have an idea right now\" moment: opening a full editor and setting up a timeline just to test a joke feels like too much.",
        },
        {
          type: "paragraph",
          text: "The core idea is speed + repeatability: take a simple input (your clip / template / assets), apply a consistent format, and export a ready-to-share result so you can iterate on the joke instead of on the tooling.",
        },
        { type: "sectionTitle", text: "What it's for" },
        {
          type: "list",
          items: [
            "Generating short-form meme reels quickly.",
            "Making multiple variations fast (timing, captions, punchlines) without redoing the same steps.",
            "Keeping output consistent across a bunch of low-effort clips.",
          ],
        },
        { type: "sectionTitle", text: "How I use it" },
        {
          type: "list",
          ordered: true,
          items: [
            "Drop in the input clip/assets for the reel.",
            "Adjust the few parameters that matter for the joke (timing, text, etc.).",
            "Run the generator to export the final video.",
            "Repeat until the clip feels right.",
          ],
        },
        { type: "sectionTitle", text: "Notes" },
        {
          type: "list",
          items: [
            "This is intentionally kept lightweight: it's not trying to replace a full editor.",
            "Video rendering pipelines can be environment-specific; the GitHub repo includes the exact setup and usage instructions.",
          ],
        },
      ],
    },
  },
  {
    id: "username-checker",
    title: "Username Availability Checker",
    period: "February 2026",
    stack: "Python 3.8+",
    description:
      "A Python CLI that checks whether a username is available on a handful of popular platforms, with clear terminal output and manual-check fallbacks where needed.",
    link: {
      href: "https://github.com/flodlol/Username-Availability-Checker",
      label: "View on GitHub",
    },
    modal: {
      content: [
        {
          type: "paragraph",
          text: "Username Availability Checker is a small Python CLI I built to quickly check if a username is available across popular platforms, without opening 10 tabs every time I'm naming a project.",
        },
        {
          type: "image",
          src: "/username-checker/preview.png",
          alt: "Username Availability Checker terminal preview",
          width: 2258,
          height: 1276,
        },
        {
          type: "paragraph",
          text: "It runs all checks concurrently and prints a clean table with color-coded statuses. The output is intentionally \"best-effort\": if a platform can't be checked reliably without heavy scraping/JS rendering, the tool marks it as unknown and gives you the profile URL to verify manually.",
        },
        { type: "sectionTitle", text: "Highlights" },
        {
          type: "list",
          items: [
            "Fast, concurrent checks using `asyncio` + `httpx`.",
            "Color-coded statuses: available, taken, unknown, error.",
            "Lightweight approach that avoids API keys and heavy scraping.",
            "Easy to extend: platforms live in a simple list in `platforms.py`.",
          ],
        },
        { type: "sectionTitle", text: "Platforms" },
        {
          type: "list",
          items: [
            "Automatically checked: GitHub, Reddit, GitLab, Bitbucket, Dev.to, CodePen, Dribbble, Behance, Hugging Face",
            "Manual/unknown by default (JS-heavy): X, TikTok, Figma",
          ],
        },
        {
          type: "paragraph",
          text: "For most platforms the check is based on simple HTTP responses (for example, 404 usually means the profile doesn't exist). For platforms that are JS-heavy or inconsistent, the tool marks them as unknown and links you to the profile page instead.",
        },
        { type: "sectionTitle", text: "How it works" },
        {
          type: "list",
          ordered: true,
          items: [
            "Define platforms in `platforms.py` using a URL template like `https://github.com/{username}`.",
            "Run requests in parallel and interpret results (200 = taken, 404 = available).",
            "If a platform is unreliable without JS, mark it as unreliable so it becomes a manual check.",
          ],
        },
        { type: "sectionTitle", text: "Tech" },
        {
          type: "list",
          items: [
            "Python 3.8+",
            "httpx (async HTTP)",
            "asyncio",
            "colorama (terminal colors)",
          ],
        },
        {
          type: "paragraph",
          text: "Because platforms change over time (rate limits, redirects, anti-bot measures), results aren't guaranteed. The tool is meant as a quick first pass to save time, not a perfect source of truth.",
        },
        {
          type: "paragraph",
          text: "The project is open source under the MIT License, and the full code is available on GitHub.",
        },
      ],
    },
  },
];

export const designProjects: Project[] = [
  {
    id: "design-1",
    title: "Headers",
    period: "Late 2022 - Early 2024",
    stack: "Photoshop · Cinema 4D",
    description: "Click to read more.",
    thumbnail: {
      src: "/design/headers/headers-preview-1.webp",
      alt: "Headers preview",
      width: 2200,
      height: 734,
    },
    links: [
      {
        href: "https://www.behance.net/gallery/162972537/Social-Media-Headers-Vol-1",
        label: "View on Behance",
      },
    ],
    modal: {
      content: [
        {
          type: "paragraph",
          text: "I used to make (Twitter) headers for clients.",
        },
        {
          type: "image",
          src: "/design/headers/header-1.webp",
          alt: "(Twitter) header design example",
          width: 2800,
          height: 933,
        },
        {
          type: "paragraph",
          text: "Most of these started with a simple brief (colors, vibe, what to include), then I'd make a 3D version of their name in Cinema 4D and compose everything in Adobe Photoshop, lighting, textures, typography, and all the small details that make it feel complete.",
        },
        {
          type: "imageRow",
          images: [
            {
              src: "/design/headers/header-2.webp",
              alt: "(Twitter) header design example",
              width: 2800,
              height: 933,
            },
            {
              src: "/design/headers/header-3.webp",
              alt: "(Twitter) header design example",
              width: 2800,
              height: 933,
            },
          ],
        },
        {
          type: "paragraph",
          text: "This is a small collection of some of the headers I made back then. \nSee more on the link below.",
        },
      ],
    },
  },
  {
    id: "thumbnails",
    title: "Minecraft Thumbnails",
    period: "Early 2021 - Late 2024",
    stack: "Photoshop",
    description: "Click to read more.",
    thumbnail: {
      src: "/design/thumbnails/thumbnail-preview-1.webp",
      alt: "Minecraft thumbnails preview",
      width: 3840,
      height: 2160,
    },
    links: [
      {
        href: "https://www.fiverr.com/flodxz/make-you-a-minecraft-youtube-thumbnail",
        label: "Fiverr",
      },
      {
        href: "https://payhip.com/flodxz",
        label: "Payhip",
      },
    ],
    modal: {
      content: [
        {
          type: "paragraph",
          text: "For a few years, I made Minecraft YouTube thumbnails for clients on a daily basis. Quick briefs with the client, fast turnarounds, and constant iteration to match a creator's style.",
        },
        {
          type: "image",
          src: "/design/thumbnails/thumbnail-1.webp",
          alt: "Minecraft thumbnail example",
          width: 1920,
          height: 1080,
        },
        {
          type: "paragraph",
          text: "I did have a Fiverr gig as a side thing, with 70+ reviews averaging 4.9 stars: [fiverr.com/flodxz](https://www.fiverr.com/flodxz/make-you-a-minecraft-youtube-thumbnail). But most of my work didn't come from Fiverr (Fiverr has quite big fees when you only charge about 10$ per thumbnail...) \n\nAround 90% of my clients were via Discord, where I handled everything from first contact to revisions and accepted my payments via PayPal.",
        },
        {
          type: "imageRow",
          images: [
            {
              src: "/design/thumbnails/thumbnail-2.webp",
              alt: "Minecraft thumbnail example",
              width: 1920,
              height: 1080,
            },
            {
              src: "/design/thumbnails/thumbnail-3.webp",
              alt: "Minecraft thumbnail example",
              width: 1920,
              height: 1080,
            },
          ],
        },
        {
          type: "paragraph",
          text: "Discord made it easy to work quickly: references, feedback, and revisions in one place. For bigger projects I sent invoices using Stripe, which helped keep things organized when a project went beyond \"just one thumbnail.\"",
        },
        {
          type: "imageRow",
          images: [
            {
              src: "/design/thumbnails/thumbnail-4.webp",
              alt: "Minecraft thumbnail example",
              width: 1920,
              height: 1080,
            },
            {
              src: "/design/thumbnails/thumbnail-5.webp",
              alt: "Minecraft thumbnail example",
              width: 1920,
              height: 1080,
            },
          ],
        },
        {
          type: "paragraph",
          text: "I also ran a Payhip store where I sold GFX asset packs and project files: [payhip.com/flodxz](https://payhip.com/flodxz). \n\nIt was a nice way to package up the stuff I was building anyway (assets, templates, and editable files) and make it useful for other creators.",
        },
        {
          type: "image",
          src: "/design/thumbnails/thumbnail-6.webp",
          alt: "Minecraft thumbnail example",
          width: 1920,
          height: 1080,
        },
        {
          type: "paragraph",
          text: "In total I've made 300+ thumbnails, generating over 6 million views across the videos they were used on. Over time I got to work with various YouTubers with 500k+ subscribers, which taught me a lot about consistency, brand identity, and what actually makes someone click.",
        },
      ],
    },
  },
];
