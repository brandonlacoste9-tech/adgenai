// ---- localStorage persistence for locks (hydrate on mount, auto-prune) ----
const LS_KEY_GLOBAL = "socialRetryLockUntil";
const LS_KEY_POSTS = "socialPostRetryLockUntil";

// Hydrate locks from localStorage on mount
useEffect(() => {
  try {
    if (typeof window === "undefined") return;
    const rawGlobal = window.localStorage.getItem(LS_KEY_GLOBAL);
    const rawPosts = window.localStorage.getItem(LS_KEY_POSTS);
    const now = Date.now();
    if (rawGlobal) {
      const val = Number(rawGlobal);
      setRetryLockUntil(isFinite(val) && val > now ? val : null);
    }
    if (rawPosts) {
      const parsed = JSON.parse(rawPosts) as Record<string, number>;
      const cleaned: Record<string, number> = {};
      for (const [k, v] of Object.entries(parsed || {})) {
        if (typeof v === "number" && v > now) cleaned[k] = v;
      }
      setPostRetryLockUntil(cleaned);
      // write back cleaned map if we dropped any expired keys
      window.localStorage.setItem(LS_KEY_POSTS, JSON.stringify(cleaned));
    }
  } catch {
    // no-op (localStorage may be unavailable)
  }
}, []);

// Helper: prune expired post locks occasionally (called on tick)
function pruneExpiredPostLocks() {
  try {
    if (typeof window === "undefined") return;
    const now = Date.now();
    let changed = false;
    const nextMap: Record<string, number> = {};
    for (const [k, until] of Object.entries(postRetryLockUntil)) {
      if (until > now) nextMap[k] = until;
      else changed = true;
    }
    if (changed) {
      setPostRetryLockUntil(nextMap);
      window.localStorage.setItem(LS_KEY_POSTS, JSON.stringify(nextMap));
    }
  } catch {
    // ignore
  }
}
// Prune expired locks every few seconds
useEffect(() => {
  const id = setInterval(pruneExpiredPostLocks, 3000);
  return () => clearInterval(id);
}, [postRetryLockUntil]);

// then update your lock helpers to persist to localStorage:

function lockFor(ms: number) {
  const until = Date.now() + ms;
  setRetryLockUntil(until);
  try {
    if (typeof window !== "undefined") window.localStorage.setItem(LS_KEY_GLOBAL, String(until));
  } catch {
    // ignore
  }
}
function lockPostFor(postId: string, ms: number) {
  const until = Date.now() + ms;
  setPostRetryLockUntil((m) => {
    const next = { ...m, [postId]: until };
    try {
      if (typeof window !== "undefined") window.localStorage.setItem(LS_KEY_POSTS, JSON.stringify(next));
    } catch {
      // ignore
    }
    return next;
  });
}