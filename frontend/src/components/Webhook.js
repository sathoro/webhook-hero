import React from "react";
import { Link } from "react-router-dom";

import Api from "../utils/Api";

export default function Webhook({ webhook }) {
  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="rounded overflow-hidden shadow-lg bg-white">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
            <div className="ml-4 mt-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {webhook.name}
              </h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <span className="inline-flex rounded-md shadow-sm">
                <Link
                  to={`/webhooks/${webhook.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
                >
                  Edit Webhook
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="px-6 py-6">
          <div>
            <label
              htmlFor={`endpoint-${webhook.id}`}
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Endpoint
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                className="form-input block w-full rounded transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                id={`endpoint-${webhook.id}`}
                value={`${Api.getAPIRoot()}/api/ingest/${webhook.id}`}
                readOnly
                onFocus={(event) => event.target.select()}
              />
            </div>
          </div>
          <div className="mt-5">
            <label
              htmlFor={`destination-${webhook.id}`}
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Destination
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                className="form-input block w-full sm:text-sm sm:leading-5"
                id={`destination-${webhook.id}`}
                value={
                  webhook.destinations[0]
                    ? `${webhook.destinations[0].sqs_queue_url}`
                    : null
                }
                readOnly
                onFocus={(event) => event.target.select()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
