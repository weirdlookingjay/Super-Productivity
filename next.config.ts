/* eslint-disable @typescript-eslint/no-require-imports */
// import type { NextConfig } from "next";

const nextConfig = {};

const withNextIntl = require("next-intl/plugin")("./i18n.ts");

export default withNextIntl(nextConfig);
