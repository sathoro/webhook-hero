import React from "react";

export default function Error({ error }) {
  if (!Object.keys(error).length) {
    return null;
  }

  return (
    <div class="rounded-md bg-red-50 p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <div class="text-sm leading-5 text-red-700">
            <ul class="list-disc pl-5">
              {Object.entries(error).map(([key, value], i) => (
                <li key={i} className={i > 0 ? "mt-1" : ""}>
                  {key}: {value[0]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
