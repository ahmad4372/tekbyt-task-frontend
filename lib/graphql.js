export async function fetchGraphQL(query, variables = {}, options = {}) {
  // Allow self-signed certificates in development
  if (process.env.NODE_ENV === "development") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  const { cache, next } = options;

  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache,
    next,
  });

  const json = await res.json();

  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
    const error = new Error("GraphQL Error");
    // @ts-ignore
    error.graphQLErrors = json.errors;
    throw error;
  }

  return json.data;
}
