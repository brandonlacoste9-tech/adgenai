/**
 * Utilities to persist "retry locks" in localStorage.
 * Key: 'social:retryLocks'
 *
 * Each lock is stored as an object mapping id -> { expiresAt: number }
 * This helper provides set/read/remove and auto-cleanup of expired locks.
 *
 * Note: Integrate into your existing social retry flow by calling setLock(id)
 * when starting a retry countdown and hasLock(id) to determine whether a
 * countdown is already in progress (survives page reloads). Call cleanupExpiredLocks()
 * on app init to remove stale entries (this module already cleans on reads).
 */

type RetryLock = { expiresAt: number };

const STORAGE_KEY = 'social:retryLocks';
const DEFAULT_TTL_MS = 60 * 1000; // 1 minute default TTL

function now(): number {
  return Date.now();
}

function readAll(): Record<string, RetryLock> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed as Record<string, RetryLock>;
    return {};
  } catch (e) {
    // If localStorage is unavailable or corrupt, fail gracefully.
    // Keep console.warn so issues can be diagnosed during development.
    // eslint-disable-next-line no-console
    console.warn('retryLockLocalStorage: failed to read', e);
    return {};
  }
}

function writeAll(map: Record<string, RetryLock>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('retryLockLocalStorage: failed to write', e);
  }
}

export function cleanupExpiredLocks(): void {
  const map = readAll();
  const nowTs = now();
  let changed = false;
  for (const k of Object.keys(map)) {
    if (map[k].expiresAt <= nowTs) {
      delete map[k];
      changed = true;
    }
  }
  if (changed) writeAll(map);
}

export function hasLock(id: string): boolean {
  cleanupExpiredLocks();
  const map = readAll();
  return Boolean(map[id]);
}

export function setLock(id: string, ttlMs = DEFAULT_TTL_MS): void {
  const map = readAll();
  const expiresAt = now() + ttlMs;
  map[id] = { expiresAt };
  writeAll(map);
}

export function removeLock(id: string): void {
  const map = readAll();
  if (map[id]) {
    delete map[id];
    writeAll(map);
  }
}

export function getLocks(): Record<string, RetryLock> {
  cleanupExpiredLocks();
  return readAll();
}