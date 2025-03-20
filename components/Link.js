import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Link as TUILink } from 'theme-ui'

export default function Link({ children, href, ...props }) {
  const router = useRouter()

  useEffect(() => {
    router.prefetch(href)
  }, [href])

  return (
    <TUILink
      href={href}
      {...props}
      onClick={e => {
        localStorage.setItem(
          'referrer',
          JSON.stringify({
            path: router.asPath,
            time: Date.now()
          })
        )
        e.preventDefault()
        router.push(href)
      }}
    >
      {children}
    </TUILink>
  )
}
