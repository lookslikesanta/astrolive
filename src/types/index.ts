export type UserProfile = {
  firstName: string;
  birthDate: string;
  birthTime?: string;
  birthPlace?: string;
};

export type MomentCategory =
  | "interview"
  | "conversation"
  | "relationship"
  | "travel"
  | "purchase"
  | "study";

export type PreferredPeriod = "morning" | "afternoon" | "evening" | "flexible";
export type Importance = "normal" | "important";
export type GuidanceTone = "supportive" | "balanced" | "caution";

export type TimeWindow = {
  label: string;
  time: string;
  tone: GuidanceTone;
  guidance: string;
};

export type MomentResult = {
  headline: string;
  bestWindow: string;
  cautionWindow: string;
  guidance: string[];
  why: string;
};

export type MomentInput = {
  category: MomentCategory;
  title?: string;
  date: string;
  preferredPeriod: PreferredPeriod;
  importance: Importance;
};

export type Moment = MomentInput & {
  id: string;
  result: MomentResult;
  collaborator?: { name: string };
};

export type SharedMomentPayload = {
  version: 1;
  creator: string;
  collaborator: string;
  category: MomentCategory;
  title: string;
  date: string;
  preferredPeriod: PreferredPeriod;
  importance: Importance;
};

export type Expert = {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  experience: string;
};
