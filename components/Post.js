import { authors } from '@/content/index.js'
import { useDisplay } from '@/lib/display'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { createContext, useContext } from 'react'
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  useColorMode
} from 'theme-ui'
import Link from './Link'
import theme from '@hackclub/theme'
export { Image }
import { useQueryParam, StringParam } from 'use-query-params';


function Tag({ children, filterOnClick }) {
  const [tag, setTag] = useQueryParam('tag', StringParam);

  const id = children.toLowerCase().replace(' ', '-')

  return (
    <Badge
      variant="outline"
      sx={{
        color: 'red',
        px: 2,
        py: 0,
        bg: "background",
        cursor: filterOnClick ? 'pointer' : 'default',
      }}
      onClick={() => {
        if (filterOnClick) setTag(tag == id ? undefined : id)
      }}
    >
      {children}
    </Badge>
  )
}

const PostContext = createContext()

// for tags, list each type of tag
/**
 * @typedef {Object} PostMeta
 * @property {string} category - The category of the post
 * @property {string} title - The title of the post
 * @property {Array.<string>} authors - The authors of the post
 * @property {Date} date - The date of the post
 * @property {Array.<"ledger"|"security"|"cards"|"receipts"|"invoices"|"donations"|"transfers"|"accounting"|"receive-money"|"organizations"|"notifications"|"comments"|"design"|"documents"|"perks"|"api"|"reimbursements"|"spending-controls"|"transparency-mode">} tags - The tags of the post
 * @property {string} slug - The slug of the post
 * @property {string} slackLink - A link to the corresponding post on Slack
 * @property {string} headwayUrl - A link to the corresponding post on Slack
 * @property {string} primaryImage - The primary image for the post
 * @property {string} description - A description of the post for SEO
 */

export function Author({ id, overrideText, sx, small }) {
  const author = authors[id]

  const width = small ? '24px' : '32px';
  const height = width;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Image
        src={author?.avatar || authors.team.avatar}
        alt={author?.name}
        style={{ height, width, borderRadius: '50%' }}
      />
      <Heading
        as="h3"
        variant="subheadline"
        sx={{ color: 'muted', m: 0, fontWeight: 500, ...sx, fontSize: small ? 1 : undefined }}
      >
        {overrideText
          ? overrideText
          : author?.role
            ? `${author?.name}, ${author?.role}`
            : (author?.name || id)}
      </Heading>
    </Box>
  )
}

export function PostTags({ tags, category, filterOnClick }) {
  tags ||= [];
  if (filterOnClick === undefined) filterOnClick = true;
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2, flexWrap: "wrap" }}>
        {category == 'new' && <Tag>New Feature</Tag>}
        {category == 'improvement' && <Tag>Improvement</Tag>}
        {category == 'newsletter' && <Tag>Newsletter</Tag>}
        {category == 'news' && <Tag>News</Tag>}
        {category == 'maintenance' && <Tag>Maintenance</Tag>}

        {tags.includes('ledger') && <Tag filterOnClick={filterOnClick}>Ledger</Tag>}
        {tags.includes('security') && <Tag filterOnClick={filterOnClick}>Security</Tag>}
        {tags.includes('cards') && <Tag filterOnClick={filterOnClick}>Cards</Tag>}
        {tags.includes('receipts') && <Tag filterOnClick={filterOnClick}>Receipts</Tag>}
        {tags.includes('invoices') && <Tag filterOnClick={filterOnClick}>Invoices</Tag>}
        {tags.includes('donations') && <Tag filterOnClick={filterOnClick}>Donations</Tag>}
        {tags.includes('transfers') && <Tag filterOnClick={filterOnClick}>Transfers</Tag>}
        {tags.includes('accounting') && <Tag filterOnClick={filterOnClick}>Accounting</Tag>}
        {tags.includes('receive-money') && <Tag filterOnClick={filterOnClick}>Receive Money</Tag>}
        {tags.includes('organizations') && <Tag filterOnClick={filterOnClick}>Organizations</Tag>}
        {tags.includes('notifications') && <Tag filterOnClick={filterOnClick}>Notifications</Tag>}
        {tags.includes('comments') && <Tag filterOnClick={filterOnClick}>Comments</Tag>}
        {tags.includes('design') && <Tag filterOnClick={filterOnClick}>Design</Tag>}
        {tags.includes('documents') && <Tag filterOnClick={filterOnClick}>Documents</Tag>}
        {tags.includes('perks') && <Tag filterOnClick={filterOnClick}>Perks</Tag>}
        {tags.includes('google-workspace') && <Tag filterOnClick={filterOnClick}>Google Workspace</Tag>}
        {tags.includes('api') && <Tag filterOnClick={filterOnClick}>API</Tag>}
        {tags.includes('reimbursements') && <Tag filterOnClick={filterOnClick}>Reimbursements</Tag>}
        {tags.includes('spending-controls') && <Tag filterOnClick={filterOnClick}>Spending Controls</Tag>}
        {tags.includes('transparency-mode') && <Tag filterOnClick={filterOnClick}>Transparency Mode</Tag>}
        {tags.includes('power-users') && <Tag filterOnClick={filterOnClick}>Power Users</Tag>}
      </Box>
    </>
  )
}

function PostHeader({ meta }) {
  let { category, title, author, date, tags, slug } = meta
  tags ||= []

  const router = useRouter()
  const [colorMode] = useColorMode()

  return (
    <Box
      sx={{
        minWidth: 'min(400px, 100%)',
        width: '400px',
        maxWidth: '100%'
      }}
    >
      <Heading as="h2" variant="headline" id={slug} mt={0}>
        {router.pathname == '/' ? (
          <Link
            href={`/posts/${slug}`}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              ':hover': {
                color: colorMode == 'dark' ? 'smoke' : 'slate'
              }
            }}
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </Heading>

      <Heading
        as="h3"
        mb={2}
        variant="subheadline"
        sx={{ color: 'muted', m: 0, fontWeight: 500, fontSize: 1 }}
      >
        {date.toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: "Etc/UTC"
        })}
      </Heading>

      <PostTags tags={tags} category={category} />
    </Box>
  )
}

function PostContent({ children, meta, skipAuthor }) {
  let { category, title, authors, date, tags, slug } = meta
  tags ||= []

  const display = useDisplay()

  if (display == 'home')
    return (
      <Flex
        sx={{
          flexDirection: ['column', 'column', 'column', 'row'],
          justifyContent: 'space-between',
          px: [3, 3, 66],
          maxWidth: '1400px',
          // mb: 4,
          gap: 5
        }}
      >
        <PostHeader meta={meta} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            flexGrow: '1',
            width: '100%'
          }}
        >
          <Box className="post" mb={0}>
            <Box className="post-content">{children}

              <Box mt={4} sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "start",
                gap: 3,
                mt: 4
              }}>
                {(Array.isArray(authors) ? authors : [authors]).map(author => <Author id={author} />)}
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    )
  else
    return (
      <Box className="post" mb={4}>

        <Box className="post-content" mt={4}>
          {children}
        </Box>

        <Box mt={4} sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
          gap: 3,
          mt: 4
        }}>
          {(Array.isArray(authors) ? authors : [authors]).map(author => <Author id={author} />)}
        </Box>
      </Box>
    )
}

export function Post({ children, meta, skipAuthor }) {
  return (
    <PostContext.Provider value={meta}>
      <PostContent meta={meta} skipAuthor={skipAuthor}>
        {children}
        {meta.preview}
      </PostContent>
    </PostContext.Provider>
  )
}

export function Preview({ children, skipLink }) {
  const meta = useContext(PostContext)

  return (
    <>
      <Box className="post-preview">{children}</Box>
      <Card
        className="post-link"
        variant="sunken"
        sx={{
          padding: '16px!important',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          borderRadius: 5,
          gap: 3
        }}
        mt={4}
      >
        <Heading
          as="h3"
          variant="subheadline"
          m={0}
          sx={{
            display: 'inline-flex'
          }}
        >
          <Author id={meta.authors[0]} sx={{ color: "text" }} />
        </Heading>

        <Box sx={{
          flexGrow: 1
        }}></Box>


        <Heading
          as="h3"
          variant="subheadline"
          m={0}
          sx={{
            display: 'inline-flex',
            fontWeight: 400
          }}
        >
          4m read
        </Heading>

        <Heading
          as="h3"
          variant="subheadline"
          m={0}
          sx={{
            display: 'inline-flex'
          }}
        >
          <Link href={`/posts/${meta.slug}`}>Read more →</Link>
        </Heading>
      </Card>
    </>
  )
}

/**
 * Creates a post component with the given metadata.
 *
 * @param {PostMeta} meta - The metadata for the post.
 * @returns {function} A component that renders the post.
 */
export default function post(meta) {
  const MDXPage = ({ children }) => {
    return <Post meta={meta} skipAuthor>{children}</Post>
  }

  MDXPage.meta = meta

  return MDXPage;
}
