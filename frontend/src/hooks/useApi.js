import { useState, useEffect } from 'react'
import client from '@/api/client'

export function useApi(url, params = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const paramsKey = JSON.stringify(params)

  useEffect(() => {
    if (!url) return
    let cancelled = false
    setLoading(true)
    setError(null)

    client
      .get(url, { params })
      .then((res) => { if (!cancelled) setData(res.data) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [url, paramsKey]) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error }
}
