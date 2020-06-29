import React, { useEffect, useState } from "react";

import Api from "../utils/Api";
import Webhook from "./Webhook";
import PageHeading from "./PageHeading";
import Alert from "./Alert";
import { useHistory } from "react-router-dom";

export default function Webhooks() {
  const [webhooks, setWebhooks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // Api.get("/api/v1/webhook").then(setWebhooks);
  }, [setWebhooks]);

  return (
    <>
      <PageHeading name="Editing Webhook" />

      <div class="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Alert type="success" title="Webhook created" body={<p>Test</p>} />
      </div>

      {webhooks.map((webhook) => (
        <Webhook key={webhook.id} webhook={webhook} />
      ))}
    </>
  );
}
