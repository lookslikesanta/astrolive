import type {
  Importance,
  MomentCategory,
  PreferredPeriod,
  SharedMomentPayload,
} from "@/types";

const allowedCategories: MomentCategory[] = [
  "interview",
  "conversation",
  "relationship",
  "travel",
  "purchase",
  "study",
];
const allowedPeriods: PreferredPeriod[] = ["morning", "afternoon", "evening", "flexible"];
const allowedImportance: Importance[] = ["normal", "important"];

function utf8ToBase64Url(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToUtf8(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeSharedMoment(payload: SharedMomentPayload) {
  return utf8ToBase64Url(JSON.stringify(payload));
}

export function decodeSharedMoment(encoded: string): SharedMomentPayload | null {
  try {
    const parsed = JSON.parse(base64UrlToUtf8(encoded)) as Partial<SharedMomentPayload>;
    if (
      parsed.version !== 1 ||
      !parsed.creator ||
      !parsed.collaborator ||
      !parsed.title ||
      !parsed.date ||
      !parsed.category ||
      !allowedCategories.includes(parsed.category) ||
      !parsed.preferredPeriod ||
      !allowedPeriods.includes(parsed.preferredPeriod) ||
      !parsed.importance ||
      !allowedImportance.includes(parsed.importance)
    ) {
      return null;
    }

    return {
      version: 1,
      creator: String(parsed.creator).slice(0, 60),
      collaborator: String(parsed.collaborator).slice(0, 60),
      category: parsed.category,
      title: String(parsed.title).slice(0, 120),
      date: String(parsed.date).slice(0, 20),
      preferredPeriod: parsed.preferredPeriod,
      importance: parsed.importance,
    };
  } catch {
    return null;
  }
}
