import styles from "./SideBar.module.css";
import { Button } from "../Button/Button";
import { useClickOutside } from "../../Hooks/useClickOutside";
import { useRef, useContext, useState } from "react";
import { Context } from "../../main";

export const SideBar = ({
  setIsSideBar,
  setIsAddEvent,
  setIsMyEvents,
  setIsMyVisits,
  setIsAddSubj,
  setIsShop,
}) => {
  const menuRef = useRef(null);
  const { store } = useContext(Context);
  useClickOutside(menuRef, () => {
    setIsSideBar(false);
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.sideBarContent} ref={menuRef}>
        <Button
          onClick={() => {
            setIsMyEvents((prev) => !prev);
            setIsSideBar((prev) => !prev);
          }}
        >
          Мои записи
        </Button>
        <Button
          onClick={() => {
            setIsMyVisits((prev) => !prev);
            setIsSideBar((prev) => !prev);
          }}
        >
          Мои посещения
        </Button>
        <Button onClick={() => setIsShop((prev) => !prev)}>Магазин</Button>
        <Button
          onClick={() => {
            setIsAddEvent((prev) => !prev);
            setIsSideBar((prev) => !prev);
          }}
        >
          Новое мероприятие
        </Button>
        <Button
          onClick={() => {
            setIsAddSubj((prev) => !prev);
            setIsSideBar((prev) => !prev);
          }}
        >
          Добавить товар
        </Button>
      </div>
    </div>
  );
};
