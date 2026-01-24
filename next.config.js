/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
