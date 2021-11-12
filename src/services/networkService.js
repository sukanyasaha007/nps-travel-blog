import qs from "qs";

const API_KEY = "6zauCetE8MKXVECJybtaKYiwerySXtQaa8630cI1";

async function initNetworkRequest({ method = "GET", url, queryParams, body }) {
  const finalQueryParams = {
    ...queryParams,
    api_key: API_KEY,
  };

  try {
    const response = await fetch(url + "?" + qs.stringify(finalQueryParams), {
      method,
      body:
        method === "GET" && typeof body === "object"
          ? undefined
          : JSON.stringify(body),
    });
    return await response.json();
  } catch (err) {
    throw err;
  }
}

export default initNetworkRequest;
