import React from "react";

export default function Alert({ type, title, body }) {
  const bgClass = "bg-green-50";

  return (
    <div className={`rounded-md p-4 ${bgClass}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-green-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm leading-5 font-medium text-green-800">
            {title}
          </h3>
          {body && (
            <div className="mt-2 text-sm leading-5 text-green-700">{body}</div>
          )}
        </div>
      </div>
    </div>
  );
}
