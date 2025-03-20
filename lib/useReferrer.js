import { useEffect, useState } from 'react'

export default function useReferrer() {
  const [referrer, setReferrer] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('referrer')
    try {
      const { path, time } = JSON.parse(raw)
      if (Date.now() - time < 5_000) {
        setReferrer(path)
        localStorage.removeItem('referrer')
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  return referrer
}
