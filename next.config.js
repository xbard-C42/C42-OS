
/** @type {import('next').NextConfig} */
const nextConfig = {
  // C42 OS Privacy-First Configuration
  eslint: {
    // Warning: This disables ESLint during builds
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Type checking during builds
    ignoreBuildErrors: false,
  },
  
  // Privacy-first settings - no external connections
  images: {
    // Disable external image optimization
    unoptimized: true,
  },
  
  // No analytics or tracking
  analyticsId: '',
  
  // Development settings
  reactStrictMode: true,
  swcMinify: true,
  
  // C42 OS specific headers for privacy
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Privacy headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // No external connections
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; media-src 'self'; object-src 'none'; child-src 'none'; worker-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
          },
        ],
      },
    ];
  },
  
  // Build output for maximum privacy
  output: 'standalone',
  
  // No telemetry
  telemetry: false,
};

module.exports = nextConfig;
