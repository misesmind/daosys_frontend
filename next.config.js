/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            net: false,
            encoding: false,
            tls: false,
            lokijs: false,
        };

        return config;
    },
}

module.exports = nextConfig
