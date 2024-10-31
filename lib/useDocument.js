import { useEffect, useState } from 'react'

export default function useDocument() {
  const [doc, setDoc] = useState(null)

  useEffect(() => {
    setDoc(document)
  }, [])

  return doc
}
