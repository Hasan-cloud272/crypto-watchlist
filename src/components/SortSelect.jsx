import styles from "./SortSelect.module.css";

function SortSelect({ value, onChange, options }) {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Сортировка"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortSelect;