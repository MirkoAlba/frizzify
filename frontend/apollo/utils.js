import { initializeApollo } from "./apollo-client";

const client = initializeApollo();

// queryObject deve essere { query: GQL_QUERY, variables: {...} }

export async function queryClient(queryObject) {
  return await client.query(queryObject);
}

export async function mutateClient(queryObject) {
  return await client.mutate(queryObject);
}
