import React from "react";
import { Link } from "react-router-dom";

export default function PageHeading({ name, buttons, breadcrumbs }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {(breadcrumbs || []).length ? (
          <nav class="hidden sm:flex items-center text-sm leading-5 font-medium mb-2">
            {breadcrumbs.map((breadcrumb, i) => (
              <span key={i} class="sm:flex">
                <Link
                  to={breadcrumb.to}
                  className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  {breadcrumb.name}
                </Link>
                {i < breadcrumbs.length - 1 && (
                  <svg
                    class="flex-shrink-0 mx-2 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-semibold leading-tight text-gray-900">
              {name}
            </h1>
          </div>
          <div className="mt-3 flex md:mt-0 md:ml-4">
            <span className="ml-3 shadow-sm rounded-md">
              {(buttons || []).map((btn, i) => (
                <button
                  key={i}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
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
