import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue
        ? JSON.parse(storedValue)
        : initialValue;
    } catch (error) {
      console.error("LocalStorage error:", error);
      return initialValue;
    }
  });

  const updateValue = (newValue) => {
    setValue((previousValue) => {
      const updatedValue =
        typeof newValue === "function"
          ? newValue(previousValue)
          : newValue;

      try {
        localStorage.setItem(
          key,
          JSON.stringify(updatedValue)
        );
      } catch (error) {
        console.error("Unable to save data:", error);
      }

      return updatedValue;
    });
  };

  return [value, updateValue];
}

export default useLocalStorage;