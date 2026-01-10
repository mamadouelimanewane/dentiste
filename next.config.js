/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config, { isServer }) => {
        // Désactiver les avertissements de casse sur Windows
        config.resolve.symlinks = false

        // Forcer Webpack à ignorer les différences de casse dans les chemins
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            }
        }

        return config
    },
    // Désactiver les optimisations qui peuvent causer des problèmes avec React 19
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
}

module.exports = nextConfig
