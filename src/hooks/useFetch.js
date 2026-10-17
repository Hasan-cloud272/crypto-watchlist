import { useState, useEffect, useCallback } from "react";

export function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetcher(controller.signal)
      .then(setData)
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [fetcher, reloadKey]);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  }, []);

  return { data, error, isLoading, refetch };
}