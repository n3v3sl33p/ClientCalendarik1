import { useContext, useState } from "react";
import styles from "./LogIn.module.css";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

const LogIn = ({ setIsLogin }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { store } = useContext(Context);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <input
          type="text"
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => store.login(email, password)}
        >
          Log in
        </button>
        <button
          onClick={() => setIsLogin((prev) => !prev)}
          className={styles.closeButton}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default observer(LogIn);
