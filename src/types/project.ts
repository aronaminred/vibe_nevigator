export type ProjectField =
  | "idea"
  | "target"
  | "serviceType"
  | "references"
  | "mvpFeatures"
  | "screens"
  | "dataApi"
  | "architecture"
  | "promptPreference"
  | "deployment";

export type Project = Record<ProjectField, string>;

export type Step = {
  id: ProjectField;
  title: string;
  shortTitle: string;
  question: string;
  helper: string;
  placeholder: string;
  required?: boolean;
};
