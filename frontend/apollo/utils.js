import { initializeApollo } from "./apollo-client";

//queryObject deve essere {query: GQL_QUERY}
export async function queryClient(queryObject) {
  const client = initializeApollo();
  return await client.query(queryObject);
}
