import { useContext, useState, useRef } from "react";
import { Context } from "../../main";
import styles from "./AddSubj.module.css";
import { useClickOutside } from "../../Hooks/useClickOutside";
import { observer } from "mobx-react-lite";
import { Button } from "../Button/Button";
import TimeModal from "../timeModal/TimeModal";

export const AddSubj = observer(({ setIsAddSubj }) => {
  const { store } = useContext(Context);
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");
  const [itemDirty, setItemDirty] = useState(false);
  const [costDirty, setCostDirty] = useState(false);
  const [costError, setCostError] = useState("Поле не может быть пустым");
  const [itemError, setItemError] = useState("Поле не может быть пустым");
  const menuRef = useRef();
  useClickOutside(menuRef, () => setIsAddSubj((prev) => !prev));

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "itemName":
        setItemDirty(true);
        break;
      case "cost":
        setCostDirty(true);
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modalContent} ref={menuRef}>
        <h2 className={styles.header}>Добавить товар</h2>
        {itemDirty && itemError && (
          <div className={styles.errorMessage}>{itemError}</div>
        )}
        <input
          onBlur={(e) => blurHandler(e)}
          className={styles.input}
          type="text"
          value={itemName}
          name="itemName"
          placeholder="Название товара"
          onChange={(e) => {
            if (e.target.value.length === 0) {
              setItemError("Поле не может быть пустым");
              setItemName(e.target.value);
            } else {
              setItemError("");
              setItemName(e.target.value);
            }
          }}
        />
        {costDirty && costError && (
          <div className={styles.errorMessage}>{costError}</div>
        )}
        <input
          onBlur={(e) => blurHandler(e)}
          className={styles.input}
          type="number"
          name="cost"
          placeholder="Стоимость"
          onChange={(e) => {
            if (e.target.value <= 0) {
              setCostError("Не верный формат стоимости");
              setCost(e.target.value);
            } else {
              setCostError("");
              setCost(e.target.value);
            }
          }}
          value={cost}
        />
        <Button
          onClick={() => {
            store.addSubj(itemName, cost);
            setItemName("");
            setCost("");
          }}
          disabled={costError || itemError}
        >
          Добавить
        </Button>
        {store.responseInfo && (
          <TimeModal message={store.responseInfo}></TimeModal>
        )}
      </div>
    </div>
  );
});
