/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        formats: ['image/avif'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/dqggb6cgz/image/upload/**'
            },
            {
                protocol: 'https',
                hostname: 'api.telegram.org',
                pathname: '/file/**'
            }
        ],
        minimumCacheTTL: 2678400
    },
    headers: () => [
        {
            source: '/chat/:id*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },
    ]
};

export default nextConfig;
