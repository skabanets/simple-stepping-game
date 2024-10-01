import { useEffect, useState } from 'react';

export const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    let currentValue: T = defaultValue;

    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        currentValue = JSON.parse(storedValue);
      }
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
};
