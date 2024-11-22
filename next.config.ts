/* eslint-disable @typescript-eslint/no-require-imports */
// import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
};

const withNextIntl = require("next-intl/plugin")("./i18n.ts");

export default withNextIntl(nextConfig);
