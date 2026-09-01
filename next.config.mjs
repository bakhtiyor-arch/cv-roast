/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cv-roast.uz",
      },
      {
        protocol: "https",
        hostname: "www.cv-roast.uz",
      },
    ],
  },
}

export default nextConfig
