/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep dev and production caches isolated so concurrent builds don't corrupt navigation assets.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  images: { unoptimized: true },
  experimental: {
    cpus: 1,
    optimizePackageImports: ['lucide-react', 'clsx', 'tailwind-merge'],
  },
  output: 'export',
};

module.exports = nextConfig;
