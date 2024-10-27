const nextConfig = {
  images:{
    remotePatterns: [
      {
        protocol:"https",
        hostname: 'external-content.duckduckgo.com'
      }
    ]
  }
};

export default nextConfig;
