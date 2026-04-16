import { posts } from '@/content'

const SITE_URL = 'https://blog.hcb.hackclub.com'

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildSitemap(allPosts) {
  const latestPost = allPosts.reduce((max, p) => {
    const d = p.meta?.date instanceof Date ? p.meta.date : new Date(p.meta?.date)
    return !max || d > max ? d : max
  }, null)

  const entries = [
    {
      loc: `${SITE_URL}/`,
      lastmod: latestPost ? latestPost.toISOString() : undefined,
      changefreq: 'daily',
      priority: '1.0'
    },
    ...allPosts.map(post => {
      const d = post.meta?.date instanceof Date ? post.meta.date : new Date(post.meta?.date)
      return {
        loc: `${SITE_URL}/posts/${post.meta.slug}`,
        lastmod: isNaN(d) ? undefined : d.toISOString(),
        changefreq: 'monthly',
        priority: '0.8'
      }
    })
  ]

  const body = entries
    .map(
      e => `  <url>
    <loc>${escapeXml(e.loc)}</loc>${e.lastmod ? `
    <lastmod>${e.lastmod}</lastmod>` : ''}
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
}

export default function Sitemap() {
  return null
}

export async function getServerSideProps({ res }) {
  const xml = buildSitemap(posts)
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(xml)
  res.end()
  return { props: {} }
}
