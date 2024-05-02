import { Context } from "../../main";
import { useContext } from "react";
import "./style.css";
import styles from "./UserIcon.module.css";

export const UserIcon = () => {
  const { store } = useContext(Context);
  console.log(store.user);
  return (
    <div className={styles.wrapper}>
      <div className={styles.userIcon}>
        <p className={styles.userName}>{store.user.email}</p>
        <button onClick={() => store.logout()} className={styles.button} />
      </div>
    </div>
  );
};
