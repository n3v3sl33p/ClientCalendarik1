import { useContext, useState, useEffect } from "react";
import styles from "./Regist.module.css";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

const Registration = ({ setIsReg }) => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );
  const [userNameDirty, setUserNameDirty] = useState(false);
  const [userNameError, setUserNameError] = useState("Введите полное имя");
  const [isFormValid, setIsFormValid] = useState(false);
  const { store } = useContext(Context);
  useEffect(() => {
    if (passwordError || emailError || userNameError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [passwordError, emailError, userNameError]);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "username":
        setUserNameDirty(true);
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

  const userNameHandler = (e) => {
    setFullName(e.target.value);
    if (!e.target.value) {
      setUserNameError("Введите полное имя");
    } else {
      setUserNameError(false);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {userNameDirty && userNameError && (
          <div className={styles.error}>{userNameError}</div>
        )}
        <input
          onBlur={(e) => blurHandler(e)}
          name="username"
          type="text"
          className={styles.input}
          placeholder="Full name"
          onChange={(e) => userNameHandler(e)}
          value={fullName}
        />
        {emailDirty && emailError && (
          <div className={styles.error}>{emailError}</div>
        )}
        <input
          onBlur={(e) => blurHandler(e)}
          name="email"
          type="text"
          className={styles.input}
          placeholder="Email"
          onChange={(e) => emailHandler(e)}
          value={email}
        />
        {passwordDirty && passwordError && (
          <div className={styles.error}>{passwordError}</div>
        )}
        <input
          onBlur={(e) => blurHandler(e)}
          name="password"
          type="password"
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => passwordHandler(e)}
        />
        <button
          disabled={!isFormValid}
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
