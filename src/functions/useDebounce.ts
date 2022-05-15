import { useState, useEffect } from "react";

export function useDebounce(val: string, delay: number) {
  const [debouncedVal, setDebouncedVal] = useState(val);
  useEffect(() => {
    const timeOutHandler = setTimeout(() => setDebouncedVal(val), delay);

    return () => clearTimeout(timeOutHandler);
  }, [delay, val]);

  if (typeof debouncedVal === "string") {
    return debouncedVal?.toLowerCase();
  }

  return debouncedVal;
}
