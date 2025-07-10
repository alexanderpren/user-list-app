import { useState, useEffect } from 'react';
/**
 *
 * @param value Value to disable(debounce)
 * @param delay miliseconds time
 * @returns debouncedValue
 */
export function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      // clean if value changes before timeout is reached
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
