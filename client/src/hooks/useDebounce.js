import { useEffect, useState } from "react";
const useDebounce = (value) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, 1000);
      // Cancel the timeout if value or delay changes.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only call the effect if value or delay changes.
    [value]
  );
  return debouncedValue;
};
export default useDebounce;