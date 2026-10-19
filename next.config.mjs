/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90],
    // Thêm domain ở đây nếu dùng ảnh từ CDN ngoài:
    // remotePatterns: [{ protocol: "https", hostname: "images.example.com" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Tiếng Việt là mặc định, không prefix: "/" phục vụ nội dung của "/vi"; "/en" là tiếng Anh.
  async rewrites() {
    return [{ source: "/", destination: "/vi" }];
  },
  async redirects() {
    return [{ source: "/vi", destination: "/", permanent: true }];
  },
};

export default nextConfig;
