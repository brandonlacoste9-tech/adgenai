# Social retry lock (localStorage persistence)

This helper persists "retry locks" in localStorage so countdowns survive page reloads.

Why
- Prevents users from triggering social retry (e.g., resend/post) repeatedly after page reload.
- Keeps UI countdown state consistent across refreshes.

Files added
- `src/utils/retryLockLocalStorage.ts` — helper API: setLock, hasLock, removeLock, getLocks, cleanupExpiredLocks

Integration suggestions
1. On app startup call `cleanupExpiredLocks()` once (the helper also cleans on reads).
2. When starting a retry countdown for an entity use `setLock(id, ttlMs)`.
3. In your UI logic check `hasLock(id)` to display countdown / disable action.
4. When a retry completes or is cancelled call `removeLock(id)`.

Example
```ts
import { setLock, hasLock, removeLock } from '../utils/retryLockLocalStorage';

function attemptSocialAction(id: string) {
  if (hasLock(id)) return; // abort — countdown in progress
  // perform action
  setLock(id, 30_000); // 30s cooldown
}
```

Notes
- TTL is stored in milliseconds. Choose sensible TTLs matching your UI countdown.
- localStorage quota and availability issues are handled gracefully (warnings only).