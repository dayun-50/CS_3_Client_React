import React from "react";
import styles from "./Loading.module.css";

const Loading = ({ message }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default Loading;
