import CoinRow from "./CoinRow";
import styles from "./CoinTable.module.css";

function CoinTable({ coins, favorites, onToggleFavorite }) {
  if (coins.length === 0) {
    return <p className={styles.empty}>Ничего не найдено</p>;
  }

  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th aria-label="Избранное" />
            <th>Монета</th>
            <th className={styles.number}>Цена</th>
            <th className={styles.number}>24ч</th>
            <th className={styles.number}>Капитализация</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <CoinRow
              key={coin.id}
              coin={coin}
              isFavorite={favorites.includes(coin.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoinTable;