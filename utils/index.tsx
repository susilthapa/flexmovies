import { useEffect, useState } from "react";

/**
 * A custom React hook to debounce a value.
 *
 * @template T The type of the value to be debounced.
 * @param {T} value The value to debounce.
 * @param {number} delay The delay in milliseconds after which the debounced value will update.
 * @returns {T} The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
