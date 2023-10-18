// @ts-check
import withPlugins from 'next-compose-plugins'
import { withWorkbox } from 'nextjs-workbox-config'
import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  workbox: {
    // enable: process.env.NODE_ENV !== 'production',
    enable: process.env.NEXT_PUBLIC_ENABLE_SERVICE_WORKER === 'true',
    swSrc: 'src/lib/client/service-worker/sw.ts',
    swDest: 'sw.js' // inside public dir path
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.tls = false
      config.resolve.fallback.net = false
      config.resolve.fallback.child_process = false
    }

    return config
  }
}

export default withPlugins([bundleAnalyzer, withWorkbox], nextConfig)
