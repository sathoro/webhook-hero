import React, { useRef, useState } from "react";

import Api from "../utils/Api";
import PageHeading from "./PageHeading";
import Error from "./Error";
import { useHistory } from "react-router-dom";

export default function CreateWebhook() {
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const nameInput = useRef();

  const createWebhook = (event) => {
    event.preventDefault();

    Api.post("/api/v1/webhook", { name: nameInput.current.value })
      .then((webhook) => {
        return Api.post("/api/v1/destination", {
          webhook: webhook.id,
          name: "Default",
        });
      })
      .then(() => history.push("/webhooks"))
      .catch(setErrors);
  };

  return (
    <>
      <PageHeading name="Create Webhook" />

      <main>
        <div class="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={createWebhook}>
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <Error error={errors} />

                  <div>
                    <label
                      for="name"
                      class="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Webhook Name
                    </label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <input
                        ref={nameInput}
                        id="name"
                        type="text"
                        required
                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <span class="inline-flex rounded-md shadow-sm">
                    <button
                      type="submit"
                      class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      Save
                    </button>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
