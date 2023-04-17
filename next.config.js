/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_username: "nextShota",
    mongodb_password: "zZWhlN4W3NltwjPL",
    mongodb_clustername: "cluster0",
    mongodb_database: "authentification",
  },
};

module.exports = nextConfig;
