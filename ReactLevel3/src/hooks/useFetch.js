import { useState, useEffect } from 'react';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, {
      ...options,
      signal: controller.signal
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      setData(result);
      setLoading(false);
    })
    .catch(err => {
      if (err.name !== 'AbortError') {
        setError(err.message);
        setLoading(false);
      }
    });

    return () => controller.abort();
  }, [url]);

  const refetch = () => {
    setLoading(true);
    setError(null);
  };

  return { data, loading, error, refetch };
}