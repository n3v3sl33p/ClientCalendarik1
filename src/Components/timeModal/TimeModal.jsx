import style from "./TimeModal.module.css";
import css from "classnames";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Context } from "../../main";
export default function TimeModal({ message }) {
  const [isShow, setIsShow] = useState(true);
  const { store } = useContext(Context);
  const [printMessage, setPrintMessage] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    const updateData = () => {
      //   switch (true) {
      //     case "Created" === message:
      //       setPrintMessage("Успешно");
      //       setType("success");
      //       break;
      //     case "OK" === message:
      //       setPrintMessage("Успешно");
      //       setType("success");
      //     case "Уже записан" === message:
      //       setPrintMessage("Вы уже записаны");
      //       setType("error");
      //       break;

      //     default:

      //       break;
      //   }
      if (message === "Created") {
        setPrintMessage("Успешно");
        setType("success");
      } else if (message === "OK") {
        setPrintMessage("Успешно");
        setType("success");
      } else if (message === "Уже записан") {
        setPrintMessage("Вы уже записаны");
        setType("error");
      } else if (message === "Недостаточно средств на балансе") {
        setPrintMessage("Недостаточно средств на балансе");
        setType("error");
      }
    };
    updateData();
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    setIsShow(false);
  };
  setInterval(() => {
    setIsShow(false);
    store.setResponseInfo("");
  }, 5000);

  return (
    <div className={css(style.alert, style[type], !isShow && style.hide)}>
      <span className={style.closebtn} onClick={handleClose}>
        &times;
      </span>
      {printMessage}
    </div>
  );
}
