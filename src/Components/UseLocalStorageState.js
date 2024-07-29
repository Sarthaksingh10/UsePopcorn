import { useState, useEffect } from "react";

export default function useLocalStorageState(initialState, key) {
  const [Value, setValue] = useState(function () {
    const StoredValue = localStorage.getItem(key);
    return StoredValue ? JSON.parse(StoredValue) : initialState;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(Value));
    },
    [Value, key]
  );

  return [Value, setValue];
}
