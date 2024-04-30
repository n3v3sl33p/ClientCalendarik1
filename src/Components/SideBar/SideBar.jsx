import styles from "./SideBar.module.css";
import { Button } from "../Button/Button";
import { useClickOutside } from "../../Hooks/useClickOutside";
import { useRef, useContext } from "react";
import { Context } from "../../main";
export const SideBar = ({ setIsSideBar }) => {
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
            console.log("asdfs");
          }}
        >
          Мои записи
        </Button>
        <Button
          onClick={() => {
            console.log("asdfs");
          }}
        >
          Мои посещения
        </Button>
        <Button
          onClick={() => {
            console.log("asdfs");
          }}
        >
          Новое мероприятие
        </Button>
      </div>
    </div>
  );
};
