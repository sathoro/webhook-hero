import React, { useEffect, useState } from "react";

import Api from "../utils/Api";
import Webhook from "./Webhook";
import PageHeading from "./PageHeading";
import Alert from "./Alert";
import { useHistory, useLocation } from "react-router-dom";

export default () => {
  const [webhooks, setWebhooks] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    Api.get("/api/v1/webhook").then(setWebhooks);
  }, [setWebhooks]);

  return (
    <>
      <PageHeading
        name="Webhooks"
        buttons={[
          {
            onClick: () => history.push("/webhooks/create"),
            name: "Create Webhook",
          },
        ]}
      />

      {webhooks && !webhooks.length ? (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="font-bold text-xl mb-5">No webhooks created yet.</div>
        </div>
      ) : null}

      {location.state &&
        (location.state.created ||
          location.state.updated ||
          location.state.deleted) && (
          <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8 -mb-6">
            <Alert
              type="success"
              title={`Webhook ${
                location.state.created
                  ? "created"
                  : location.state.updated
                  ? "updated"
                  : "deleted"
              }`}
            />
          </div>
        )}

      {(webhooks || []).map((webhook) => (
        <Webhook key={webhook.id} webhook={webhook} />
      ))}
    </>
  );
};
