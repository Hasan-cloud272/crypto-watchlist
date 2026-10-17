import { useCoins, SORT_OPTIONS } from "./hooks/useCoins";
import SearchBar from "./components/SearchBar";
import SortSelect from "./components/SortSelect";
import CoinTable from "./components/CoinTable";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import styles from "./App.module.css";

function App() {
  const {
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
  } = useCoins();

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    content = <ErrorMessage message={error.message} onRetry={refetch} />;
  } else {
    content = (
      <CoinTable
        coins={coins}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    );
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Crypto Watchlist</h1>
        <p className={styles.subtitle}>Топ-50 монет по капитализации</p>
      </header>

      <div className={styles.controls}>
        <div className={styles.search}>
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <SortSelect
          value={sortBy}
          onChange={setSortBy}
          options={SORT_OPTIONS}
        />
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={(e) => setShowFavoritesOnly(e.target.checked)}
          />
          Только избранное
        </label>
      </div>

      {content}

      <footer className={styles.footer}>
        Данные: <a href="https://www.coingecko.com" target="_blank" rel="noreferrer">CoinGecko</a>
      </footer>
    </main>
  );
}

export default App;