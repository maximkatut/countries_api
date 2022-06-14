/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 300,
  images: {
    domains: ["flagcdn.com", "upload.wikimedia.org"],
  },
};

module.exports = nextConfig;
