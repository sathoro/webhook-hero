import React from "react";

import Api from "../utils/Api";

export default function Webhook({ webhook }) {
  return (
    <div class="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="rounded overflow-hidden shadow-lg bg-white">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-5">{webhook.name}</div>
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Endpoint
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                id="email"
                class="form-input block w-full sm:text-sm sm:leading-5"
                value={`${Api.getAPIRoot()}/api/ingest/${webhook.id}`}
              />
            </div>
          </div>
          <div className="mt-3">
            <label
              for="email"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Destination
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                id="email"
                class="form-input block w-full sm:text-sm sm:leading-5"
                value={
                  webhook.destinations[0]
                    ? `${webhook.destinations[0].sqs_queue_url}`
                    : null
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
