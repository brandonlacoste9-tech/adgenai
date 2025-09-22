'use client';

import { useEffect } from 'react';
import { cleanupExpiredLocks } from '../utils/retryLockLocalStorage';

export default function RetryLockBootstrap() {
  useEffect(() => {
    try {
      cleanupExpiredLocks();
    } catch {
      // ignore
    }
  }, []);

  return null;
}
