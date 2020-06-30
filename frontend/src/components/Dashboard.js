import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Api from "../utils/Api";
import ReactTimeAgo from "react-time-ago";

export default function Dashboard() {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    Api.get("/api/v1/incoming-message").then((messages) => {
      setMessages(messages);
    });
  }, []);

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-semibold leading-tight text-gray-900">
                Dashboard
              </h1>
            </div>
            <div className="mt-3 flex md:mt-0 md:ml-4"> </div>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* <h3 className="text-xl leading-6 font-medium text-gray-900">
            Webhook request stats
          </h3>

          <div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                      Last 24 hours
                    </dt>
                    <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                      71,897
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                      Last 7 days
                    </dt>
                    <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                      820,574
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                      Last 30 days
                    </dt>
                    <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                      5,683,299
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div> */}

          <h3 className="text-xl leading-6 font-medium text-gray-900">
            Requests log
          </h3>

          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col">
              <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Request Time
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Webhook
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {(messages || []).map((message) => (
                        <tr key={message.id}>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900">
                            <Link
                              to={`/request/${message.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              {message.id}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                            <ReactTimeAgo date={message.created_at} />
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                            <Link
                              to={`/webhooks/${message.webhook.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              {message.webhook.name}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
