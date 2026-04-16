import Head from 'next/head'
import { authors as authorMap } from '@/content'

// The canonical public origin. Keep in sync with pages/sitemap.xml.js and public/robots.txt.
const SITE_URL = 'https://blog.hcb.hackclub.com'
const SITE_NAME = 'HCB Blog'
const DEFAULT_DESCRIPTION =
  'Updates, improvements, engineering deep-dives, and announcements from HCB — the finance platform for nonprofits, hackathons, and student communities, built by Hack Club.'
const DEFAULT_IMAGE = `${SITE_URL}/og-v1.png`
const TWITTER_HANDLE = '@hackclub'

function toIso(date) {
  if (!date) return undefined
  return date instanceof Date ? date.toISOString() : new Date(date).toISOString()
}

function absoluteImage(meta) {
  if (meta?.primaryImage?.src) return `${SITE_URL}${meta.primaryImage.src}`
  return DEFAULT_IMAGE
}

function resolveAuthors(meta) {
  const ids = Array.isArray(meta?.authors) ? meta.authors : meta?.authors ? [meta.authors] : []
  return ids.map(id => authorMap[id]?.name || id).filter(Boolean)
}

/**
 * Site-wide SEO component.
 *
 * - For post detail pages, pass `post` (the full post object with `.meta`).
 * - For any other page, pass `title`, `description`, `path`, and `noindex` as needed.
 *
 * Emits: <title>, meta description, canonical, Open Graph, Twitter cards,
 * and JSON-LD (BlogPosting for posts, WebSite for the home page).
 */
export default function Seo({ post, title, description, path = '/', image, noindex = false }) {
  if (post) {
    const { meta } = post
    const url = `${SITE_URL}/posts/${meta.slug}`
    const fullTitle = `${meta.title} – ${SITE_NAME}`
    const desc =
      meta.description ||
      `Read "${meta.title}" on the ${SITE_NAME} — updates and announcements from HCB by Hack Club.`
    const img = absoluteImage(meta)
    const published = toIso(meta.date)
    const authorNames = resolveAuthors(meta)
    const tags = Array.isArray(meta.tags) ? meta.tags : []

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: meta.title,
      description: desc,
      image: [img],
      datePublished: published,
      dateModified: published,
      author: authorNames.map(name => ({ '@type': 'Person', name })),
      publisher: {
        '@type': 'Organization',
        name: 'Hack Club',
        logo: {
          '@type': 'ImageObject',
          url: 'https://assets.hackclub.com/hcb-light.svg'
        }
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      keywords: tags.join(', ') || undefined,
      articleSection: meta.category || undefined
    }

    return (
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        {noindex && <meta name="robots" content="noindex,nofollow" />}

        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={img} />
        <meta property="og:locale" content="en_US" />
        {published && <meta property="article:published_time" content={published} />}
        {authorNames.map(name => (
          <meta key={`author-${name}`} property="article:author" content={name} />
        ))}
        {tags.map(tag => (
          <meta key={`tag-${tag}`} property="article:tag" content={tag} />
        ))}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={img} />
        <meta name="twitter:site" content={TWITTER_HANDLE} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
    )
  }

  const pageTitle = title ? `${title} – ${SITE_NAME}` : SITE_NAME
  const shortTitle = title || SITE_NAME
  const desc = description || DEFAULT_DESCRIPTION
  const url = `${SITE_URL}${path || '/'}`
  const img = image || DEFAULT_IMAGE

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: 'Hack Club',
      url: 'https://hackclub.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://assets.hackclub.com/hcb-light.svg'
      }
    }
  }

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={shortTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={shortTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  )
}
