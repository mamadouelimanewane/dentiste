/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
    webpack: (config) => {
        config.resolve.symlinks = false;
        return config;
    },
}

module.exports = nextConfig
