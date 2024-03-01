import { useContext, useEffect, useState } from "react";
import styles from "./LogIn.module.css";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

const LogIn = ({ setIsLogin }) => {
  const { store } = useContext(Context);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    await store.login(data.email, data.password);
    if (store.errorMessage) {
      setValue("password", "");
    } else {
      setIsLogin((prev) => !prev);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.modal}>
      <div className={styles.modalContent}>
        {errors.email && (
          <div className={styles.error}>{errors.email.message}</div>
        )}
        <input
          {...register("email", {
            pattern: {
              value:
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
              message: "Неверный формат",
            },
            required: "Поле обязательное",
          })}
          placeholder="Email"
          type="text"
          name="email"
          className={styles.input}
        />
        {errors.password && (
          <div className={styles.error}>{errors.password.message}</div>
        )}
        <input
          {...register("password", {
            required: "Поле обязательное",
            minLength: {
              value: 6,
              message: "Минимальная длина пароля 6 символов",
            },
          })}
          placeholder="Password"
          type="password"
          name="password"
          className={styles.input}
        />
        {store.errorMessage && (
          <div className={styles.error}>{store.errorMessage}</div>
        )}
        <button type="submit" className={styles.button}>
          Log in
        </button>
        <button
          onClick={() => setIsLogin((prev) => !prev)}
          className={styles.closeButton}
        >
          X
        </button>
      </div>
    </form>
  );
};

export default observer(LogIn);
