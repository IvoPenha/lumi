import { CommonRangeType } from '@/types/services';
import { isDefined } from './object';

export function commonRangeQueryBuilder<T>(start: object | string, end: object | string): CommonRangeType<T> | undefined {
  const range = [start, end].filter(isDefined) as Array<T>;
  if (!range.length) return;

  return {
    start: isDefined(start) ? start : null,
    end: isDefined(end) ? end : null
  } as CommonRangeType<T>;
}
