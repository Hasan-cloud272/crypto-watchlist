import { memo } from "react";
import { formatPrice, formatPercent, formatMarketCap } from "../utils/formatters";
import styles from "./CoinRow.module.css";

function CoinRow({ coin, isFavorite, onToggleFavorite }) {
  const change = coin.price_change_percentage_24h;
  const changeClass =
    change > 0 ? styles.positive : change < 0 ? styles.negative : "";

  return (
    <tr>
      <td>
        <button
          className={styles.star}
          onClick={() => onToggleFavorite(coin.id)}
          aria-label={
            isFavorite
              ? `Убрать ${coin.name} из избранного`
              : `Добавить ${coin.name} в избранное`
          }
          aria-pressed={isFavorite}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </td>
      <td>
        <div className={styles.coin}>
          <img
            src={coin.image}
            alt=""
            width="24"
            height="24"
            loading="lazy"
          />
          <span className={styles.name}>{coin.name}</span>
          <span className={styles.symbol}>{coin.symbol.toUpperCase()}</span>
        </div>
      </td>
      <td className={styles.number}>{formatPrice(coin.current_price)}</td>
      <td className={`${styles.number} ${changeClass}`}>
        {formatPercent(change)}
      </td>
      <td className={styles.number}>{formatMarketCap(coin.market_cap)}</td>
    </tr>
  );
}

export default memo(CoinRow);