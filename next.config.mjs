/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['./src/inspector/'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
