// Client-side waitlist store. Swap the body of submitWaitlist for an API
// call later; the result contract is designed to stay the same.

const STORAGE_KEY = 'powersell-waitlist';

export type WaitlistResult =
  | { ok: true }
  | { ok: false; reason: 'invalid' | 'duplicate' };

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function readSignups(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function submitWaitlist(email: string): WaitlistResult {
  const normalized = email.trim().toLowerCase();
  if (!isValidEmail(normalized)) {
    return { ok: false, reason: 'invalid' };
  }

  const signups = readSignups();
  if (signups.includes(normalized)) {
    return { ok: false, reason: 'duplicate' };
  }

  signups.push(normalized);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(signups));
  return { ok: true };
}
