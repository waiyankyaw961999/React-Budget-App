import { useState, useEffect } from "react";

function LocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const JsonValue = localStorage.getItem(key);
    if (JsonValue != null) return JSON.parse(JsonValue);

    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default LocalStorage;
