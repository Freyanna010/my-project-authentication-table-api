import { useEffect, useState } from "react";

 export const useLocalStorage = (initialValue: any, key: string) => {
const getValue = () => {
    try {
      const storage = localStorage.getItem(key);
      return storage ? JSON.parse(storage) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  };

  const [value, setValue] = useState<any>(getValue);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [value, key]);

  return [value, setValue] as const;
  };



