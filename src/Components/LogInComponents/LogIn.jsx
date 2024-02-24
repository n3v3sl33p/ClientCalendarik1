import { useContext, useEffect, useState } from "react";
import styles from "./LogIn.module.css";

import { Context } from "../../main";
import { observer } from "mobx-react-lite";

const LogIn = ({ setIsLogin }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );
  const [isFormValid, setIsFormValid] = useState(false);
  const { store } = useContext(Context);

  useEffect(() => {
    if (passwordError || emailError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [passwordError, emailError]);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некоректный Email");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3) {
      setPasswordError("Пароль должен быть не менее 3 символов");
      if (!e.target.value) {
        setPasswordError("Пароль не может быть пустым");
      }
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {emailError && emailDirty && (
          <div className={styles.error}>{emailError}</div>
        )}
        <input
          name="email"
          type="text"
          autoComplete="disbled"
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => emailHandler(e)}
          onBlur={(e) => blurHandler(e)}
        />
        {passwordDirty && passwordError && (
          <div className={styles.error}>{passwordError}</div>
        )}
        <input
          name="password"
          type="password"
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => passwordHandler(e)}
          onBlur={(e) => blurHandler(e)}
        />
        <button
          disabled={!isFormValid}
          type="submit"
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
