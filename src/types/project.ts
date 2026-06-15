export type ProjectField =
  | "serviceName"
  | "serviceDescription"
  | "problem"
  | "goal"
  | "targetUser"
  | "userSituation"
  | "painPoints"
  | "serviceType"
  | "platform"
  | "references"
  | "referenceNotes"
  | "mvpFeatures"
  | "excludedFeatures"
  | "screens"
  | "userJourney"
  | "dataModel"
  | "apiNeeds"
  | "architecture"
  | "constraints"
  | "promptTarget"
  | "promptPreference"
  | "deployment"
  | "qaChecklist";

export type Project = Record<ProjectField, string>;

export type StepInput = {
  id: ProjectField;
  label: string;
  placeholder: string;
  multiline?: boolean;
  maxLength?: number;
  required?: boolean;
};

export type Step = {
  title: string;
  shortTitle: string;
  icon: string;
  question: string;
  helper: string;
  inputs: StepInput[];
};
