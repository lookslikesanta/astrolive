import type { Moment, UserProfile } from "@/types";

const PROFILE_KEY = "astrolive-compass:v1:profile";
const MOMENTS_KEY = "astrolive-compass:v1:moments";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readProfile(): UserProfile | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    if (!parsed.firstName || !parsed.birthDate) return null;
    return {
      firstName: String(parsed.firstName),
      birthDate: String(parsed.birthDate),
      birthTime: parsed.birthTime ? String(parsed.birthTime) : undefined,
      birthPlace: parsed.birthPlace ? String(parsed.birthPlace) : undefined,
    };
  } catch {
    return null;
  }
}

export function writeProfile(profile: UserProfile) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function readMoments(): Moment[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(MOMENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Moment[]) : [];
  } catch {
    return [];
  }
}

export function saveMoment(moment: Moment) {
  if (!canUseStorage()) return;
  const current = readMoments();
  const next = [moment, ...current.filter((item) => item.id !== moment.id)].slice(0, 8);
  window.localStorage.setItem(MOMENTS_KEY, JSON.stringify(next));
}
