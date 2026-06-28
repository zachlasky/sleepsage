import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['ss-supplement-images.s3.us-east-2.amazonaws.com', 'picsum.photos']
  }
};

export default nextConfig;
