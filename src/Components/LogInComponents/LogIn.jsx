import { useContext, useEffect, useState } from "react";
import styles from "./LogIn.module.css";

import { Context } from "../../main";
import { observer } from "mobx-react-lite";

const LogIn = ({ setIsLogin }) => {
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
        {store.errorMessage && (
          <div className={styles.error}>{store.errorMessage}</div>
        )}
        <button
          disabled={!isFormValid}
          type="submit"
          className={styles.button}
          onClick={() => {
            store.login(email, password);
            setPassword("");
            setEmail("");
          }}
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
