import { useContext, useState } from "react";
import styles from "./Regist.module.css";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

const Registration = ({ setIsReg }) => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { store } = useContext(Context);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <input
          type="text"
          className={styles.input}
          placeholder="Full name"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
          onClick={() => store.registration(email, password, fullName)}
        >
          Registration
        </button>
        <button
          onClick={() => setIsReg((prev) => !prev)}
          className={styles.closeButton}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default observer(Registration);
