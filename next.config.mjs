/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        formats: ['image/webp','image/avif'],
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
        ]
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
