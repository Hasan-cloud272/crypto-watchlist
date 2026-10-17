import styles from "./ErrorMessage.module.css";

function ErrorMessage({ message, onRetry }) {
  return (
    <div className={styles.wrapper} role="alert">
      <p className={styles.text}>{message}</p>
      {onRetry && (
        <button className={styles.button} onClick={onRetry}>
          Повторить
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;