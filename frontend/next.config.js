/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'firebasestorage.googleapis.com',
            },
        ],
    },

    env: {
        SERVER_URL: process.env.SERVER_URL,
    },
};

module.exports = nextConfig;
