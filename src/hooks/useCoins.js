import { useState, useMemo, useCallback } from "react";
import { useFetch } from "./useFetch";
import { useDebounce } from "./useDebounce";
import { useLocalStorage } from "./useLocalStorage";
import { fetchTopCoins } from "../services/coingecko";

const loadCoins = (signal) => fetchTopCoins({ signal });

export const SORT_OPTIONS = [
  { value: "market-cap", label: "По капитализации" },
  { value: "price-desc", label: "Цена: по убыванию" },
  { value: "price-asc", label: "Цена: по возрастанию" },
  { value: "change-desc", label: "Рост за 24ч" },
  { value: "change-asc", label: "Падение за 24ч" },
];

const SORTERS = {
  "price-desc": (a, b) => b.current_price - a.current_price,
  "price-asc": (a, b) => a.current_price - b.current_price,
  "change-desc": (a, b) =>
    (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0),
  "change-asc": (a, b) =>
    (a.price_change_percentage_24h ?? 0) - (b.price_change_percentage_24h ?? 0),
};

export function useCoins() {
  const { data, error, isLoading, refetch } = useFetch(loadCoins);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("market-cap");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const debouncedSearch = useDebounce(search, 300);

  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    },
    [setFavorites]
  );

  const coins = useMemo(() => {
    if (!data) return [];

    const query = debouncedSearch.trim().toLowerCase();

    let result = data.filter((coin) => {
      if (showFavoritesOnly && !favorites.includes(coin.id)) return false;
      if (!query) return true;
      return (
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
      );
    });

    const sorter = SORTERS[sortBy];
    if (sorter) result = [...result].sort(sorter);

    return result;
  }, [data, debouncedSearch, sortBy, showFavoritesOnly, favorites]);

  return {
    coins,
    isLoading,
    error,
    refetch,
    search,
    setSearch,
    sortBy,
    setSortBy,
    favorites,
    toggleFavorite,
    showFavoritesOnly,
    setShowFavoritesOnly,
  };
}