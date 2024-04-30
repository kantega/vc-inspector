/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  transpilePackages: ['./src/inspector/'],
};

export default nextConfig;
