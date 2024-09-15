/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.itsfogo.com",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
