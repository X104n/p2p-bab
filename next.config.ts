/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // This replaces the old 'next export' command
  // Optional: Add basePath if deploying to a subdirectory
  // basePath: '/your-repo-name',
  
  // Optional: Disable image optimization since GitHub Pages doesn't support Next.js Image Optimization
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;