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
};

export type SkillGroup = {
  label: string;
  items: SkillItem[];
};

export const heroSkills: SkillGroup[] = [
  {
    label: "I like to work with",
    items: [
      { label: "TypeScript", icon: "typescript" },
      { label: "JavaScript", icon: "javascript" },
      { label: "Python", icon: "python" },
      { label: "HTML", icon: "html" },
      { label: "CSS", icon: "css" },
    ],
  },
];
