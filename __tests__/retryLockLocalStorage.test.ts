import { cleanupExpiredLocks, setLock, hasLock, removeLock, getLocks } from '../src/utils/retryLockLocalStorage';

describe('retryLockLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test('setLock / hasLock / removeLock / getLocks basic flow', () => {
    const base = Date.now();
    const nowSpy = jest.spyOn(Date, 'now').mockImplementation(() => base);

    setLock('a', 1000);
    expect(hasLock('a')).toBe(true);

    const locks = getLocks();
    expect(Object.keys(locks)).toContain('a');

    removeLock('a');
    expect(hasLock('a')).toBe(false);

    nowSpy.mockRestore();
  });

  test('cleanupExpiredLocks removes expired entries', () => {
    const base = Date.now();
    let t = base;
    const nowSpy = jest.spyOn(Date, 'now').mockImplementation(() => t);

    setLock('b', 10);
    expect(hasLock('b')).toBe(true);

    t = base + 50;
    // simulate time advanced
    nowSpy.mockImplementation(() => t);
    cleanupExpiredLocks();
    expect(hasLock('b')).toBe(false);

    nowSpy.mockRestore();
  });
});
