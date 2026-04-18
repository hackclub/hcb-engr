import { posts } from '@/content'

const SITE_URL = 'https://blog.hcb.hackclub.com'

// Serves /llms.txt — an emerging de-facto standard for LLM-powered tools to
// discover a curated inventory of a site's content. See https://llmstxt.org/.
function buildLlmsTxt(allPosts) {
  const sorted = [...allPosts].sort((a, b) => {
    const da = a.meta?.date instanceof Date ? a.meta.date : new Date(a.meta?.date)
    const db = b.meta?.date instanceof Date ? b.meta.date : new Date(b.meta?.date)
    return db - da
  })

  const lines = [
    '# HCB Blog',
    '',
    `> Updates, improvements, engineering deep-dives, and announcements from HCB — the finance platform for nonprofits, hackathons, and student communities, built by Hack Club. Canonical site: ${SITE_URL}.`,
    '',
    `Every post is available as both HTML (at /posts/<slug>) and plain markdown (at /posts/<slug>.md) — the links below point at the markdown variants, which are the preferred format for LLM ingestion.`,
    '',
    '## Posts',
    ''
  ]

  for (const post of sorted) {
    const { meta } = post
    if (!meta?.slug || !meta?.title) continue
    const url = `${SITE_URL}/posts/${meta.slug}.md`
    const desc = meta.description ? `: ${meta.description}` : ''
    lines.push(`- [${meta.title}](${url})${desc}`)
  }

  lines.push('')
  return lines.join('\n')
}

export default function LlmsTxt() {
  return null
}

export async function getServerSideProps({ res }) {
  const body = buildLlmsTxt(posts)
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(body)
  res.end()
  return { props: {} }
}
