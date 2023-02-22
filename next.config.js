/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.mzstatic.com'
      }
    ]
  },
  rewrites: () => {
    return [
      {
        source: '/podcast',
        destination: 'https://itunes.apple.com/'
      }
    ]
  }
}

module.exports = nextConfig
