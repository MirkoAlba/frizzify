module.exports = {
  reactStrictMode: true,
  // poweredByHeader: false,
  env: {
    FRONTEND_URL_DEVELOPMENT: process.env.FRONTEND_URL_DEVELOPMENT,
    FRONTEND_URL_PRODUCTION: process.env.FRONTEND_URL_PRODUCTION,
    STRAPI_GRAPHQL_URL_DEVELOPMENT: process.env.STRAPI_GRAPHQL_URL_DEVELOPMENT,
    STRAPI_GRAPHQL_URL_PRODUCTION: process.env.STRAPI_GRAPHQL_URL_PRODUCTION,
  },
  images: {
    domains: ["localhost", "192.168.1.102"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
