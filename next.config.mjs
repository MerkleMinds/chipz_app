/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.itsfogo.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.laliga.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
