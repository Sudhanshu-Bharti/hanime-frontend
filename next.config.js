/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  api: {
    bodyParser: false,
    responseLimit: false,
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy-video',
        destination: 'https://m3u8s.highwinds-cdn.com/api/v9/m3u8s/:url*',
      },
      {
        source: '/video/:path*',
        destination: 'https://s32.highwinds-cdn.com/:path*',
      }
    ]
  },
}

module.exports = nextConfig
