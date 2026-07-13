const nextConfig = {
  output: 'export',
  // Добавляем этот блок:
  trailingSlash: true,
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;