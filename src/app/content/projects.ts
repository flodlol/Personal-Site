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
      "I wanted to know where my study time was actually going, so I started building the tracker I could not find.",
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
      "Lecture slides are terrible for handwritten notes. Drop in a PDF, get something you can actually write on.",
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
          text: "A lot of TNT Tag history lived in old videos, forgotten forum posts, and people's memories. I had stopped playing by then, but I was bored one winter break and thought organizing all of it sounded fun. I built a navigable timeline for updates, guilds, creators, rivalries, and the bits of community history that usually disappear. It was the first time I had structured that much connected data.",
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
      "A Python shortcut for turning a dumb idea into a reel before the joke stops being funny.",
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
          text: "Sometimes I had an idea for a stupid reel and opening a full editor felt like enough work to kill it. So I made a small Python tool that handles the repetitive part. It takes the clips and assets, applies the same format, and exports something ready to share. It is intentionally small because a full editor already exists, and I did not want to accidentally build another one. Less editing, more finding out whether the joke was actually funny.",
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
          text: "Naming a project is already annoying. Finding out that the name is taken on the ninth website is worse, so I built a small CLI that checks the obvious places in one go.",
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
