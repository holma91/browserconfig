/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_web3storage_api_key:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGM5NGE2YmQ5ODNiMzYzMDFmZDQ3QmU2RTRGM2UxODJDYzZhQjlmODIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njg0Mzc0NzMxMTUsIm5hbWUiOiJicm93c2VyY29uZmlnIn0.kDOsCFsYDuKPy5YLryljRowOJiDrG0AWSDiqZNf_Lkw',
  },
};

module.exports = nextConfig;
