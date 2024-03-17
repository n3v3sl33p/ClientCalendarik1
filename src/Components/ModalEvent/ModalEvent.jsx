import { observer } from "mobx-react-lite";
import styles from "./Style.module.css";
import { useContext } from "react";
import { Context } from "../../main";

export const ModalEvent = (props) => {
  const { store } = useContext(Context);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{props.event.title}</h2>
        <p>{props.event.resource.id}</p>
        <button
          className={styles.closeButton}
          onClick={(prev) => props.setIsModalEvent(!prev)}
          type="button"
        >
          X
        </button>
        <button
          onClick={(prev) => {
            store.deleteEvent(props.event.resource.id);
            props.setIsModalEvent(!prev);
          }}
        >
          Удалить событые
        </button>
      </div>
    </div>
  );
};
observer(ModalEvent);
