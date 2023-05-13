/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output:"standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vgiapitest.blob.core.windows.net',
        port: "",
        pathname: '/game-images/**',
      }
    ]
  }
}

module.exports = nextConfig
