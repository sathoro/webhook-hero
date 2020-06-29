import React, { useRef, useCallback } from "react";
import useOutsideClick from "../utils/useOutsideClick";

export default function AccountAvatar({ onClick, name, onClickAway }) {
  function getInitialsFromName(name) {
    if (!name) {
      return "";
    }

    var names = name.split(" ");

    return (
      names[0].substr(0, 1).toUpperCase() +
      (names.length > 1 ? names[1].substr(0, 1).toUpperCase() : "")
    );
  }

  const ref = useRef();

  const onOutsideClick = useCallback(() => onClickAway && onClickAway(), [
    onClickAway,
  ]);

  useOutsideClick(ref, onOutsideClick);

  return (
    <button
      class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-orange-500 focus:outline-none focus:border-gray-300"
      onClick={onClick}
      ref={ref}
    >
      <span class="text-md font-medium leading-none text-white">
        {getInitialsFromName(name)}
      </span>
    </button>
  );
}
