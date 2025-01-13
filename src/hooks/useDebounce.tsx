import { useState, useEffect } from 'react';


 //Debounces a value by the specified delay.

export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup the timeout if the value changes before the delay
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};