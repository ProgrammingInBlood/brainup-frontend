const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withPWA = require("next-pwa");

module.exports = withBundleAnalyzer(
  withPWA({
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
      disable: true,
    },
    reactStrictMode: true,
    images: {
      domains: [
        "localhost",
        "lh3.googleusercontent.com",
        "api.eklavyasingh.me",
        "avatars.dicebear.com",
      ],
    },
  })
);
