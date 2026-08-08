export type SkillIcon =
  | "typescript"
  | "javascript"
  | "html"
  | "css"
  | "python"
  | "react"
  | "nextjs"
  | "photoshop"
  | "cinema4d"
  | "figma";

export type SkillItem = {
  label: string;
  icon: SkillIcon;
  url?: string;
};

export type SkillGroup = {
  label: string;
  items: SkillItem[];
};

export const heroSkills: SkillGroup[] = [
  {
    label: "I like to work with",
    items: [
      {
        label: "TypeScript",
        icon: "typescript",
        url: "https://www.typescriptlang.org/",
      },
      {
        label: "JavaScript",
        icon: "javascript",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      { label: "Python", icon: "python", url: "https://www.python.org/" },
      {
        label: "HTML",
        icon: "html",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      },
      {
        label: "CSS",
        icon: "css",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      },
    ],
  },
];
