import styles from "./Loader.module.css";

function Loader({ label = "Загрузка..." }) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default Loader;