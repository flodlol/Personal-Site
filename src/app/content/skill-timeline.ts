import type { SkillIcon } from "./skills";

export type SkillTimelineItem = {
  when: string;
  label: string;
  note?: string;
  icon?: SkillIcon;
  fallbackIcon?: "code" | "projects";
  dotIcons?: SkillIcon[];
  dotImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  dotTheme?: "study-track";
  gapAfter?: "short" | "long";
};

// Shown under the hero skills. Edit freely.
export const heroSkillTimeline: SkillTimelineItem[] = [
  {
    when: "2018",
    label: "HTML",
    note: "Learnt HTML in an optional elementary school class.",
    icon: "html",
    gapAfter: "long",
  },
  {
    when: "2020",
    label: "JavaScript",
    note: "Started coding Discord bots in JavaScript.",
    icon: "javascript",
    gapAfter: "short",
  },
  {
    when: "2021",
    label: "Minecraft Servers",
    note: "Started coding Minecraft servers.",
    fallbackIcon: "code",
    gapAfter: "long",
  },
  {
    when: "2023",
    label: "Python",
    note: "Learnt Python partly at school.",
    icon: "python",
    gapAfter: "short",
  },
  {
    when: "2024",
    label: "Websites",
    note: "Started properly making websites with React and Next.js, while still playing around with Python projects.",
    dotIcons: ["react", "nextjs"],
    gapAfter: "short",
  },
  {
    when: "2025",
    label: "Bigger Projects",
    note: "Started working on bigger projects for myself.",
    fallbackIcon: "projects",
    gapAfter: "short",
  },
  {
    when: "Late 2025",
    label: "Study-Track",
    note: "Started working on Study-Track.",
    dotTheme: "study-track",
    dotImage: {
      src: "/study-track/study-track-logo.png",
      alt: "Study-Track logo",
      width: 240,
      height: 240,
    },
  },
];
