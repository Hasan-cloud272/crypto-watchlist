import { useState, useEffect, useCallback, useRef } from "react";

export function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const isSilentRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    const isSilent = isSilentRef.current;
    isSilentRef.current = false;

    fetcher(controller.signal)
      .then((result) => {
        setData(result);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        if (!isSilent) setError(err);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [fetcher, reloadKey]);

  const refetch = useCallback(() => {
    isSilentRef.current = false;
    setIsLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  }, []);

  const refresh = useCallback(() => {
    isSilentRef.current = true;
    setReloadKey((key) => key + 1);
  }, []);

  return { data, error, isLoading, refetch, refresh };
}