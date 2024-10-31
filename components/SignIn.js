import { useEffect, useState } from 'react'
import { Button, Image, useColorMode } from 'theme-ui'

export default function SignIn({ color }) {
  const [user, setUser] =
    /** @type {ReturnType<typeof useState<{name?: string, avatar?: string} | null>>} */ (
      useState(null)
    )

  const [colorMode] = useColorMode()

  useEffect(() => {
    ;(async () => {
      const _user = await fetch('https://hcb.hackclub.com/api/current_user', {
        credentials: 'include'
      })
        .then(r => (r.ok ? r.json() : null))
        .catch(() => {})

      if (_user) setUser(_user)
    })()
  }, [])

  return (
    <Button
      as="a"
      href="https://hcb.hackclub.com"
      variant="outline"
      sx={{ color: color || (colorMode == 'dark' ? 'white' : 'black') }}
    >
      {user ? (
        <>
          <Image
            src={user.avatar}
            alt={`${user.name}'s HCB avatar`}
            width={30}
            sx={{ borderRadius: 'circle', mr: 2, boxShadow: 'elevated' }}
          />
          Continue to HCB
        </>
      ) : (
        'Sign in'
      )}
    </Button>
  )
}
