import { useState, useEffect } from "react";

export function useStorage(key: string, initialValue: any) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    chrome.storage.local.get(key, (data) => {
      if (data && data[key]) {
        setValue(data[key]);
      }
    });
  }, [key]);

  useEffect(() => {
    chrome.storage.local.set({ [key]: value });
  }, [key, value]);

  return [value, setValue];
}
