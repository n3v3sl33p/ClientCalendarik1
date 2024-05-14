import { observer } from "mobx-react-lite";
import styles from "./Style.module.css";
import { useContext, useState, useRef } from "react";
import { Context } from "../../main";

import { Button } from "../Button/Button";
import { useClickOutside } from "../../Hooks/useClickOutside";

export const ModalEvent = observer(
  ({ event, setIsModalEvent, setIsMarkVisited, setCurrentEvent }) => {
    const { store } = useContext(Context);
    const [showVisitedModal, setShowVisitedModal] = useState(false);
    const menuRef = useRef(null);
    useClickOutside(menuRef, () => {
      setIsModalEvent((prev) => !prev);
      store.signUpError = null;
    });

    return (
      <div className={styles.modal}>
        {showVisitedModal && (
          <MarkVisitedModal
            setShowVisitedModal={setShowVisitedModal}
            eventId={event.resource.id}
          />
        )}
        <div className={styles.modalContent} ref={menuRef}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>{event.start.toLocaleDateString()}</p>

          <Button
            onClick={() => {
              setCurrentEvent(event.resource.id);
              setIsModalEvent(false);
              setIsMarkVisited((prev) => !prev);
            }}
          >
            Запись
          </Button>
          <Button
            onClick={(prev) => {
              store.deleteEvent(event.resource.id);
              setIsModalEvent(!prev);
            }}
          >
            Удалить событые
          </Button>
          <Button
            onClick={() => {
              store.signUpEvent(event.resource.id, store.user.id);
            }}
          >
            Буду
          </Button>
          {store.signUpError && <div>Вы уже записаны</div>}
        </div>
      </div>
    );
  }
);
