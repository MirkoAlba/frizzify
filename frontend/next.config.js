module.exports = {
  reactStrictMode: true,
  env: {
    STRAPI_GRAPHQL_URL_DEVELOPMENT: process.env.STRAPI_GRAPHQL_URL_DEVELOPMENT,
    STRAPI_GRAPHQL_URL_PRODUCTION: process.env.STRAPI_GRAPHQL_URL_PRODUCTION,
  },
};
