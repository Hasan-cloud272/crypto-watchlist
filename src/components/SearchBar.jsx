import styles from "./SearchBar.module.css";

function SearchBar({ value, onChange, placeholder = "Поиск монеты..." }) {
  return (
    <input
      className={styles.input}
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Поиск монеты"
    />
  );
}

export default SearchBar;