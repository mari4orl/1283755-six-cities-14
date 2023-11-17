import styles from './loading.module.css';

function Loading(): JSX.Element {
  return (
    <div className={`${styles.background}`}>
      <div className={`${styles.spinner}`}>
        <div className={`${styles.blob} ${styles.top}`}></div>
        <div className={`${styles.blob} ${styles.bottom}`}></div>
        <div className={`${styles.blob} ${styles.left}`}></div>
        <div className={`${styles.blob} ${styles.move_blob}`}></div>
      </div>
    </div>
  );
}

export default Loading;
