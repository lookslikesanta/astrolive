import type {
  Expert,
  MomentCategory,
  MomentInput,
  MomentResult,
  TimeWindow,
  UserProfile,
} from "@/types";

export const demoProfile: UserProfile = {
  firstName: "Aarav",
  birthDate: "1998-11-14",
  birthTime: "09:20",
  birthPlace: "Lucknow, Uttar Pradesh, India",
};

export const dailyCompass = {
  headline: "A better day for clarity than speed.",
  summary:
    "Use the earlier part of the day to organize, review, and have conversations that need patience. Avoid forcing quick decisions simply to clear them from your list.",
  leanInto: ["Planning", "Honest conversations", "Focused work"],
  takeCareWith: ["Rushed commitments", "Impulse purchases"],
  why:
    "Your demo chart signals are being translated into practical timing guidance. In a production version, AstroLive would calculate the underlying planetary positions deterministically and use an explanation layer to make them easier to act on.",
  windows: [
    {
      label: "Morning",
      time: "8:30 AM – 11:00 AM",
      tone: "supportive",
      guidance: "Good for planning, preparation, and focused work.",
    },
    {
      label: "Afternoon",
      time: "1:30 PM – 3:30 PM",
      tone: "caution",
      guidance: "Keep important decisions reversible where possible.",
    },
    {
      label: "Evening",
      time: "6:00 PM – 8:00 PM",
      tone: "balanced",
      guidance: "Better for conversations and reflection than heavy execution.",
    },
  ] satisfies TimeWindow[],
};

export const categoryLabels: Record<MomentCategory, string> = {
  interview: "Interview or meeting",
  conversation: "Difficult conversation",
  relationship: "Date or relationship",
  travel: "Travel",
  purchase: "Purchase or decision",
  study: "Study or focus",
};

export const categoryDescriptions: Record<MomentCategory, string> = {
  interview: "Prepare, present, negotiate, or meet someone important.",
  conversation: "Resolve something that needs honesty and patience.",
  relationship: "Plan time together without turning it into a score.",
  travel: "Choose a calmer window and protect your schedule with buffer.",
  purchase: "Slow urgency down before committing money or attention.",
  study: "Protect a focused block and make the next step obvious.",
};

const fixtureBase: Record<MomentCategory, Omit<MomentResult, "why">> = {
  interview: {
    headline: "Prepare early, then keep the conversation flexible.",
    bestWindow: "9:20 AM – 10:50 AM",
    cautionWindow: "2:00 PM – 3:15 PM",
    guidance: [
      "Review the two points you most want remembered.",
      "Keep ten minutes of buffer before the meeting.",
      "Avoid changing your core position only because the conversation becomes tense.",
    ],
  },
  conversation: {
    headline: "Choose clarity over winning the conversation.",
    bestWindow: "6:10 PM – 7:30 PM",
    cautionWindow: "1:40 PM – 3:00 PM",
    guidance: [
      "Start with what you want to resolve.",
      "Ask one clarifying question before defending your view.",
      "Leave room to continue later if emotions rise.",
    ],
  },
  relationship: {
    headline: "Keep the plan simple enough for the conversation to lead.",
    bestWindow: "6:30 PM – 8:10 PM",
    cautionWindow: "3:00 PM – 4:00 PM",
    guidance: [
      "Prefer a relaxed plan over an over-scheduled one.",
      "Say what you actually mean instead of testing reactions.",
      "Do not treat one awkward moment as the meaning of the whole evening.",
    ],
  },
  travel: {
    headline: "Preparation matters more than squeezing the schedule.",
    bestWindow: "8:00 AM – 10:30 AM",
    cautionWindow: "2:10 PM – 3:30 PM",
    guidance: [
      "Leave buffer for delays.",
      "Confirm documents, fuel or charge, and route before departure.",
      "Avoid stacking another time-sensitive commitment immediately after arrival.",
    ],
  },
  purchase: {
    headline: "Compare first; commit after the urgency fades.",
    bestWindow: "10:00 AM – 11:30 AM",
    cautionWindow: "1:30 PM – 3:30 PM",
    guidance: [
      "Compare the option against your original requirement.",
      "Separate a limited-time offer from a genuinely limited opportunity.",
      "For expensive decisions, sleep on it when practical.",
    ],
  },
  study: {
    headline: "Use a protected block instead of chasing motivation.",
    bestWindow: "8:30 AM – 10:45 AM",
    cautionWindow: "2:00 PM – 3:00 PM",
    guidance: [
      "Start with the hardest defined task.",
      "Keep the phone physically away for one block.",
      "Finish by writing the next starting point.",
    ],
  },
};

export function generateMomentResult(input: MomentInput): MomentResult {
  const fixture = fixtureBase[input.category];
  const periodNote =
    input.preferredPeriod === "flexible"
      ? "You left the timing flexible, so the strongest window is prioritized over a preferred part of day."
      : `You preferred the ${input.preferredPeriod}; the recommendation keeps that preference in view while still showing a caution window.`;
  const importanceNote =
    input.importance === "important"
      ? "Because you marked this as important, treat the guidance as a prompt to prepare more carefully—not as a guarantee of outcome."
      : "Use this as a lightweight planning prompt rather than a prediction of outcome.";

  return {
    ...fixture,
    why: `${periodNote} ${importanceNote}`,
  };
}

export const sharedGuidance = {
  headline: "The strongest window is one where both of you can slow the pace.",
  worksWell: ["State the issue directly", "Allow pauses", "Agree on one next step"],
  takeCareWith: [
    "Reading silence as rejection",
    "Bringing unrelated old issues into the same conversation",
  ],
  sharedWindow: "6:20 PM – 7:20 PM",
};

export const demoExperts: Expert[] = [
  {
    id: "expert-1",
    name: "Astrologer Meera",
    specialty: "Relationships & life guidance",
    languages: ["Hindi", "English"],
    experience: "8+ years",
  },
  {
    id: "expert-2",
    name: "Astrologer Arjun",
    specialty: "Career & decision timing",
    languages: ["Hindi", "English"],
    experience: "10+ years",
  },
  {
    id: "expert-3",
    name: "Astrologer Kavya",
    specialty: "Vedic astrology & compatibility",
    languages: ["Hindi", "English"],
    experience: "7+ years",
  },
];
