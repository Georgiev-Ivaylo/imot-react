import { useState } from "react";

export const useStorage = () => {
  const [value, setValue] = useState(null);

  const setItem = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
    // setValue(value);
  };

  const getItem = (key) => {
    let value = sessionStorage.getItem(key);

    try {
      value = JSON.parse(value);
    } catch (e) {
      value = null;
    }
    // setValue(value);
    return value;
  };

  const removeItem = (key) => {
    sessionStorage.removeItem(key);
    // setValue(null);
  };

  return { setItem, getItem, removeItem };
};
