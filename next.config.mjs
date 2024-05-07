/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: ['./src/inspector/'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
