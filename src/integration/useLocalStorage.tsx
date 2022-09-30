import { useCallback } from "react";

export const useLocalStorage = <T extends {}>() => {
  const getStorage = useCallback((key: string): T | null => {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item) as T;
  }, []);

  const setStorage = useCallback((
      key: string,
      data: T, 
    ): boolean => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
      } catch (err) {
        return false;
      }
    },
    []
  );

  return {
    getStorage,
    setStorage,
  };
};
