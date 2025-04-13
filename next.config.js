/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com', 'api.dicebear.com', 'picsum.photos'],
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // You can add default values here, but it's better to use .env.local for secrets
  },
}

module.exports = nextConfig 
