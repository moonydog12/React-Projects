import { useEffect, useState } from 'react';
import { ImdbMovie } from './interfaces';

export function useLocalStorageState(initialState: ImdbMovie[], keyName: string) {
  const [value, setValue] = useState<ImdbMovie[]>(() => {
    const storedValue = localStorage.getItem(keyName);

    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(value));
  }, [value, keyName]);

  return [value, setValue] as const;
}
