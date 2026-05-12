import { useState, useEffect } from "react";

const useDebounce = (value, delay = 300) => {
  const [debounceValue, setdebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setdebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
