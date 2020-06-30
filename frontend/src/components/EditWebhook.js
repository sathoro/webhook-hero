import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import PageHeading from "./PageHeading";
import Api from "../utils/Api";
import Error from "./Error";
import Modal from "./Modal";

export default () => {
  const { id } = useParams();
  const [webhook, setWebhook] = useState(null);
  const [errors, setErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const history = useHistory();
  const nameInput = useRef();

  useEffect(() => {
    Api.get(`/api/v1/webhook/${id}`).then((webhook) => {
      setWebhook(webhook);
      nameInput.current.value = webhook.name;
    });
  }, [id]);

  const saveWebhook = (event) => {
    event.preventDefault();

    Api.put(`/api/v1/webhook/${id}`, {
      name: nameInput.current.value,
    })
      .then(() => history.push("/webhooks", { updated: true }))
      .catch(setErrors);
  };

  const deleteWebhook = () => {
    Api.delete(`/api/v1/webhook/${id}`).then(() => {
      history.push("/webhooks", { deleted: true });
    });
  };

  if (!webhook) {
    return null;
  }

  return (
    <>
      <PageHeading
        breadcrumbs={[
          {
            to: "/webhooks",
            name: "Webhooks",
          },
          {
            to: `/webhooks/${webhook.id}`,
            name: webhook.name,
          },
        ]}
        name={webhook.name}
      ></PageHeading>

      {showDeleteModal && (
        <Modal
          type="danger"
          title="Delete webhook"
          body="Are you sure you want to delete this webhook? This action cannot be undone."
          onCancel={() => setShowDeleteModal(false)}
          buttons={[
            {
              text: "Delete",
              onClick: deleteWebhook,
            },
          ]}
        />
      )}

      <main>
        <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={saveWebhook}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <Error error={errors} />

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Webhook Name
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        ref={nameInput}
                        id="name"
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between px-4 py-3 bg-gray-50 sm:px-6">
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    type="button"
                    className="rounded-md shadow-sm inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition duration-150 ease-in-out"
                  >
                    Delete
                  </button>

                  <div>
                    <Link
                      to="/webhooks"
                      class="mr-2 inline-flex justify-center rounded-md border border-gray-200 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Cancel
                    </Link>

                    <button
                      type="submit"
                      className="rounded-md shadow-sm inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
