export type ProjectLink = {
  href: string;
  label: string;
};

export type ProjectModal = {
  paragraphs?: string[];
  content?: ProjectModalContentBlock[];
};

export type ProjectModalContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      browser?: {
        title?: string;
        url: string;
      };
    }
  | {
      type: "reelGallery";
      items: {
        href: string;
        src: string;
        alt: string;
        width: number;
        height: number;
        likes: string;
        comments: string;
        views: string;
      }[];
    };

export type Project = {
  id: string;
  title: string;
  period?: string;
  stack?: string | string[];
  description: string;
  link?: ProjectLink;
  links?: ProjectLink[];
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    darkMark?: boolean;
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
    stack: ["React (Vite)", "Firebase", "Stripe"],
    description:
      "My main side project at the moment. I have been building it for a while now, it is past 5k users, and we are finally starting to see real growth.",
    link: { href: "https://study-track.app", label: "Study-Track" },
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
          text: "I kept finishing busy days with no clear idea of what I had actually done. Most trackers wanted me to spend more time managing the tracker, which was not exactly helping, so I built Study-Track. It pulls in academic schedules, makes starting a study session quick, and turns the result into something I can actually read. There is a social side too, because studying next to friends works better for me than another motivational notification.",
        },
        {
          type: "image",
          src: "/study-track/home-page.png",
          alt: "Study-Track homepage",
          width: 2940,
          height: 1583,
          browser: {
            title: "Study-Track",
            url: "study-track.app",
          },
        },
        {
          type: "paragraph",
          text: "There is no team hiding behind it. I do the product, design, frontend, backend, and occasionally break all four at once. It is live, people use it, and I still change my mind about parts of it every week.",
        },
      ],
    },
  },
  {
    id: "hand-outs",
    title: "Hand-Outs",
    period: "February 2026 - Now",
    stack: ["Next.js", "TypeScript", "PDF.js"],
    description:
      "I got annoyed with lecture slides being awful for handwritten notes, so I built a way to drop in a PDF and get something you can actually use.",
    links: [
      { href: "https://hand-outs.com", label: "Hand-Outs" },
      {
        href: "https://github.com/flodlol/PDF-Slides-to-Hand-Outs",
        label: "GitHub",
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
          text: "Professors upload huge slide decks. Printing them gives you tiny slides and nowhere to write, while annotating on top of the content turns everything into a mess. I got annoyed enough to build Hand-Outs: drop in a PDF, choose the layout and note space, then download something you can actually use during a lecture.",
        },
        {
          type: "paragraph",
          text: "It does one job and tries not to get in the way. I built it with Next.js, TypeScript, and PDF.js, and most of the interesting work is convincing PDFs from everywhere to behave the same way. Tiny problem, apparently annoying enough for a whole website.",
        },
      ],
    },
  },
];
export const pastProjects: Project[] = [
  {
    id: "clowbie",
    title: "Clowbie",
    period: "August 2026",
    stack: [
      "Next.js",
      "Plain CSS",
      "Product handling",
      "Shipping flow",
      "Admin dashboard",
    ],
    description:
      "A small site for my sister's 3D printing hobby, made so her prints have a proper little home online.",
    link: {
      href: "https://clowbie.netlify.app",
      label: "Clowbie",
    },
    logo: {
      src: "/clowbie-logo.svg",
      alt: "Clowbie logo",
      width: 2048,
      height: 1720,
      darkMark: true,
    },
    modal: {
      content: [
        {
          type: "paragraph",
          text: "Clowbie is a small website I made for my sister's 3D printing hobby. She had the fun part covered already: making prints, trying ideas, and turning plastic into little objects people actually want to look at. I wanted to give that work a clean place to live online instead of leaving it scattered in messages or photos.",
        },
        {
          type: "image",
          src: "/clowbie/home-page.png",
          alt: "Clowbie homepage",
          width: 2940,
          height: 1583,
          browser: {
            title: "Clowbie",
            url: "clowbie.netlify.app",
          },
        },

        {
          type: "paragraph",
          text: "Even though it looks simple, it is a fully working site behind the scenes. It handles products, shipping details, and an admin dashboard, so she can manage the hobby without needing a pile of manual work around it. It is still intentionally personal, but it has the practical bits a real shop-like site needs.",
        },
      ],
    },
  },
  {
    id: "tag-timeline",
    title: "Tag-Timeline",
    period: "December 2024 - February 2025",
    stack: ["React (Next.js)", "Firebase"],
    description:
      "I tried to put years of TNT Tag history in one place. The code was fun. Verifying years of lore was not.",
    links: [
      {
        href: "https://tagtimeline.com",
        label: "Tag-Timeline",
      },
      {
        href: "https://github.com/flodlol/Tag-History",
        label: "GitHub",
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
      content: [
        {
          type: "paragraph",
          text: "TNT Tag is a Minecraft minigame where one player starts with the TNT and has to tag someone else before it explodes, so each round becomes a very fast game of chase and survival.",
        },
        {
          type: "paragraph",
          text: " A lot of its history lived in old videos, forgotten forum posts, and people's memories. I had stopped playing by then, but I was bored one winter break and thought organizing all of it sounded fun. I built a navigable timeline for updates, guilds, creators, rivalries, and the bits of community history that usually disappear.",
        },
        {
          type: "image",
          src: "/tag-timeline/home-page.png",
          alt: "Tag-Timeline homepage",
          width: 2940,
          height: 1583,
        },
        {
          type: "paragraph",
          text: "I finished roughly 90% of the code, and then the research became homework. Verifying every event was slower than building the site, and eventually I admitted that part was just not fun for me. I never finished filling the archive, but the project still taught me a lot about data structure, search, and designing around messy information.",
        },
      ],
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
      "A Python script to get rich of social media (real).",
    link: {
      href: "https://github.com/flodlol/Reel-Generator",
      label: "GitHub",
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
          text: "My best mate Egon and I had this stupid idea of trying to get rich off social media. The idea was to contribute to the braindead content slop before the AI slop took over. We took a bunch of images, quotes, and sounds, put them in folders, and let the script do the rest. It would randomly pick a sound, an image, and a quote, then generate a reel with the right dimensions and duration.",
        },
        {
          type: "reelGallery",
          items: [
            {
              href: "https://www.instagram.com/reel/C-3qZcWt7Y3/",
              src: "/reel-generator/reel-1.jpg",
              alt: "Reel-Generator Instagram reel preview 1",
              width: 640,
              height: 640,
              likes: "23K",
              comments: "16",
              views: "465K",
            },
            {
              href: "https://www.instagram.com/reel/C-73yXmNCJE/",
              src: "/reel-generator/reel-2.jpg",
              alt: "Reel-Generator Instagram reel preview 2",
              width: 640,
              height: 640,
              likes: "237K",
              comments: "14",
              views: "2.3M",
            },
            {
              href: "https://www.instagram.com/reel/C_fhI-ntJgW/",
              src: "/reel-generator/reel-3.jpg",
              alt: "Reel-Generator Instagram reel preview 3",
              width: 640,
              height: 640,
              likes: "28.9K",
              comments: "91",
              views: "688K",
            },
          ],
        },
        {
          type: "paragraph",
          text: "It was a fun little project, but we never got rich.",
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
      "Checks a username across the internet so I do not have to open ten tabs every time I name something.",
    link: {
      href: "https://github.com/flodlol/Username-Availability-Checker",
      label: "GitHub",
    },
    modal: {
      content: [
        {
          type: "paragraph",
          text: "I hated searching all sites to see if a username was taken, so I wrote this simple Python script to do it for me. It checks a username across the internet and prints a clear available, taken, unknown, or error result.",
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
          text: "The checks run concurrently with `asyncio` and `httpx`, then print a clear available, taken, unknown, or error result. The internet is inconsistent, so platforms that rely heavily on JavaScript fall back to a manual link instead of pretending the answer is reliable. It is a quick first pass, not a perfect source of truth, because apparently platforms enjoy keeping small Python scripts humble.",
        },
      ],
    },
  },
];
