export const uri =
  process.env.NODE_ENV === "development"
    ? `http://${process.env.STRAPI_GRAPHQL_URL_DEVELOPMENT}`
    : `http://${process.env.STRAPI_GRAPHQL_URL_PRODUCTION}`;
