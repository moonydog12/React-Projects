import { useEffect } from 'react';

export function useKLey(key: string, action) {
  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      if (event.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };

    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [key, action]);
}
