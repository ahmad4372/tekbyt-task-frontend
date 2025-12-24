export async function fetchGraphQL(query, variables = {}, options = {}) {
  // Allow self-signed certificates in development
  if (process.env.NODE_ENV === "development") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  const { cache, next } = options;

  const username = process.env.WP_USER;
  const password = process.env.WP_APP_PASSWORD;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add Basic Auth if credentials exist
  if (username && password) {
    headers["Authorization"] = "Basic " + btoa(`${username}:${password}`);
  } else {
    console.warn(
      "WordPress credentials not set. Falling back to unauthenticated request."
    );
  }

  const res = await fetch(process.env.WP_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    cache,
    next,
  });

  let json;
  try {
    json = await res.json();
  } catch (error) {
    console.error("Failed to parse GraphQL response:", error);
    throw new Error(
      `Server Error: Received invalid response (${res.status} ${res.statusText})`
    );
  }

  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
    const message = json.errors[0]?.message || "GraphQL Error";
    const error = new Error(message);
    // @ts-ignore
    error.graphQLErrors = json.errors;
    throw error;
  }

  return json.data;
}
