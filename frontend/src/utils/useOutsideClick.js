// https://medium.com/@kevinfelisilda/click-outside-element-event-using-react-hooks-2c540814b661

import { useEffect, useCallback } from "react";

const useOutsideClick = (ref, callback) => {
  const handleClick = useCallback(
    (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, handleClick]);
};

export default useOutsideClick;
