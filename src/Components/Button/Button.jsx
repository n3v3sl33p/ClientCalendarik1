import styles from "./Button.module.css";

export const Button = ({ children, onClick, disabled, isClose }) => {
  return (
    <button
      className={isClose ? styles.closeButton : styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
