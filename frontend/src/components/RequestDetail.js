import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageHeading from "./PageHeading";
import Api from "../utils/Api";

export default function RequestDetail() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    Api.get("/api/v1/incoming-message/" + id).then((message) =>
      setMessage(message)
    );
  }, [id]);

  if (!message) {
    return null;
  }

  return (
    <>
      <PageHeading name="Request Details"></PageHeading>

      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="rounded overflow-hidden shadow-lg bg-white py-6 px-4 sm:px-6 lg:px-8">
          <dl>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Request ID
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {message.id}
              </dd>
            </div>

            <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Method
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {message.method}
              </dd>
            </div>

            <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Headers
              </dt>
              <dd class="text-sm leading-5 text-gray-900 sm:col-span-2">
                <dl>
                  {Object.entries(message.headers).map(([key, value], i) => (
                    <div
                      key={i}
                      className={`${
                        i % 2 ? "bg-white" : "bg-gray-50"
                      } px-0 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2`}
                    >
                      <dt class="leading-5 font-medium text-gray-500">{key}</dt>
                      <dd class="mt-1 leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </dd>
            </div>

            <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Webhook
              </dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {message.webhook}
              </dd>
            </div>

            <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
              <dt class="text-sm leading-5 font-medium text-gray-500">Body</dt>
              <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {message.body}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}