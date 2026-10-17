import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function metadata(env) {
  const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  const httpsUrl = (value, name, originOnly = false) => {
    if (!value) return ''
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password || (originOnly && (url.pathname !== '/' || url.search || url.hash))) {
      throw new Error(`${name} must be a public HTTPS ${originOnly ? 'origin without a path' : 'URL'}`)
    }
    return originOnly ? url.origin : url.href
  }
  const origin = httpsUrl(env.SITE_URL, 'SITE_URL', true)
  const image = httpsUrl(env.SOCIAL_IMAGE_URL, 'SOCIAL_IMAGE_URL')
  return {
    name: 'portfolio-metadata',
    transformIndexHtml() {
      const tags = []
      if (origin) tags.push(
        { tag: 'link', attrs: { rel: 'canonical', href: `${origin}/` } },
        { tag: 'meta', attrs: { property: 'og:url', content: `${origin}/` } },
      )
      if (image) tags.push(
        { tag: 'meta', attrs: { property: 'og:image', content: image } },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: 'Ateeb Mazhar portfolio' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
      )
      tags.push({ tag: 'meta', attrs: { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' } })
      return tags
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}` })
      if (origin) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(origin)}/</loc></url></urlset>\n` })
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), metadata(loadEnv(mode, '.', ''))],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'react-vendor', test: /node_modules\/(?:react|react-dom|scheduler)\//, priority: 40 },
            { name: 'three-core', test: /node_modules\/three\//, priority: 20 },
            { name: 'three-react', test: /node_modules\/(?:@react-three|three-stdlib)\//, priority: 10 },
          ],
        },
      },
    },
  },
}))
