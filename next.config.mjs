/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "media.itsfogo.com",
      //   pathname: "/media/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "upload.wikimedia.org",
      //   pathname: "/**",
      // },
      {
        protocol: "https",
        hostname: "assets.laliga.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
