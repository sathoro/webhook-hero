const Api = {
  get,
  post,
  put,
  getAPIRoot,
  delete: _delete,
};

function getAPIRoot() {
  return "https://localhost:8000";
}

function get(url, queryParams) {
  return request({
    url: url,
    method: "GET",
    data: queryParams,
  });
}

function post(url, body) {
  return request({
    url: url,
    method: "POST",
    data: body,
  });
}

function put(url, body) {
  return request({
    url: url,
    method: "PUT",
    data: body,
  });
}

function _delete(url, queryParams) {
  return request({
    url: url,
    method: "DELETE",
    data: queryParams,
  });
}

function request(params) {
  let qs = "";
  let url;

  const requestOptions = {
    method: params.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const accountId = JSON.parse(localStorage.getItem("account_id"));

  if (accountId) {
    requestOptions.headers["X-WH-Account-Id"] = accountId;
  }

  if (params.method === "GET" || params.method === "DELETE") {
    if (params.data && Object.keys(params.data).length) {
      qs = "?" + getQueryString(params.data);
    }
  } else {
    requestOptions.body = JSON.stringify(params.data);
  }

  if (qs) {
    url = `${params.url}?${qs}`;
  } else {
    url = params.url;
  }

  return fetch(url, requestOptions).then(handleResponse);
}

function getQueryString(data) {
  var esc = encodeURIComponent;

  return Object.keys(data)
    .map((k) => esc(k) + "=" + esc(data[k]))
    .join("&");
}

function handleResponse(response) {
  return response.text().then((text) => {
    let data = null;

    try {
      data = JSON.parse(text);
    } catch {
      // TODO handle this error case
    }

    if (!response.ok) {
      return Promise.reject(data);
    }

    return data;
  });
}

export default Api;
