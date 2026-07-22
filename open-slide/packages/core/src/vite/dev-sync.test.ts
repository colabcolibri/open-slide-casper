import { describe, expect, it, vi } from 'vitest';
import { createDebouncedAction } from './dev-sync.ts';

describe('createDebouncedAction', () => {
  it('coalesces rapid calls into one execution', async () => {
    vi.useFakeTimers();
    const action = vi.fn();
    const schedule = createDebouncedAction(100, action);

    schedule();
    schedule();
    schedule();

    expect(action).not.toHaveBeenCalled();
    vi.advanceTimersByTime(99);
    expect(action).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(action).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
