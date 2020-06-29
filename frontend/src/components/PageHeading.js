import React from "react";

export default function PageHeading({ name, buttons }) {
  return (
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex-1 min-w-0">
            <h1 class="text-3xl font-semibold leading-tight text-gray-900">
              {name}
            </h1>
          </div>
          <div class="mt-3 flex md:mt-0 md:ml-4">
            <span class="ml-3 shadow-sm rounded-md">
              {(buttons || []).map((btn) => (
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
                  onClick={btn.onClick}
                >
                  {btn.name}
                </button>
              ))}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
