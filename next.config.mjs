/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['./src/inspector/'],
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.md$/,
      loader: 'raw-loader',
    });
    return config;
  },
};

export default nextConfig;
