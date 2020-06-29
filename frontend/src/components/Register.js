import React, { useRef, useState } from "react";

import Error from "./Error";
import { useAppState } from "../state";
import Api from "../utils/Api";

export default function Register() {
  const { onLogin } = useAppState();
  const [error, setError] = useState({});

  const emailInput = useRef();
  const passwordInput = useRef();
  const passwordTwoInput = useRef();
  const nameInput = useRef();
  const accountNameInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentFormValue = {
      email: emailInput.current.value,
      name: nameInput.current.value,
      account_name: accountNameInput.current.value,
      password_1: passwordInput.current.value,
      password_2: passwordTwoInput.current.value,
    };

    Api.post("/api/v1/register", currentFormValue)
      .then(() => {
        onLogin();
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div class="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Register
        </h2>
      </div>
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {Object.keys(error).length ? <Error error={error} /> : null}

        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                Email Address
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  ref={emailInput}
                  id="email"
                  type="email"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div class="mt-6">
              <label
                for="name"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                Name
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  ref={nameInput}
                  id="name"
                  type="text"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div class="mt-6">
              <label
                for="account_name"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                Account Name
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  ref={accountNameInput}
                  id="account_name"
                  type="text"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div class="mt-6">
              <label
                for="password_1"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                Password
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  ref={passwordInput}
                  id="password_1"
                  type="password"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div class="mt-6">
              <label
                for="password_2"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                Confirm Password
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  ref={passwordTwoInput}
                  id="password_2"
                  type="password"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div class="mt-6">
              <span class="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Register
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
