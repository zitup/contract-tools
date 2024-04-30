/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  distDir: 'build',
  images: {
    unoptimized: true
  },
}
if(isProd) {
  nextConfig.output = 'export';
  nextConfig.compiler = {
    removeConsole: true
  }
}

export default nextConfig
