import { useContext } from "react";
import styles from "./Regist.module.css";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

const Registration = ({ setIsReg }) => {
  const { store } = useContext(Context);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    await store.registration(data.email, data.password, data.fullName);
    if (store.errorMessage) {
      setValue("password", "");
    } else {
      setIsReg((prev) => !prev);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.modal}>
      <div className={styles.modalContent}>
        {errors.fullName && (
          <div className={styles.error}>{errors.fullName.message}</div>
        )}
        <input
          {...register("fullName", {
            required: "Поле обязательное",
            pattern: {
              value: /^[a-zA-Z ]+$/,
              message: "Только буквы алфавита",
            },
          })}
          placeholder="Full Name"
          type="text"
          name="fullName"
          className={styles.input}
        />
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
          Registration
        </button>
        <button
          onClick={() => setIsReg((prev) => !prev)}
          className={styles.closeButton}
        >
          X
        </button>
      </div>
    </form>
  );
};

export default observer(Registration);
