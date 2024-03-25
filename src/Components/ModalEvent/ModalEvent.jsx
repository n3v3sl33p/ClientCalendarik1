import { observer } from "mobx-react-lite";
import styles from "./Style.module.css";
import { useContext, useState } from "react";
import { Context } from "../../main";
import { MarkVisitedModal } from "../MarkVisited/MarkVisitedModal";
import { Button } from "../Button/Button";

export const ModalEvent = (props) => {
  const { store } = useContext(Context);
  const [showVisitedModal, setShowVisitedModal] = useState(false);

  return (
    <div className={styles.modal}>
      {showVisitedModal && (
        <MarkVisitedModal
          setShowVisitedModal={setShowVisitedModal}
          eventId={props.event.resource.id}
        />
      )}
      <div className={styles.modalContent}>
        <h2>{props.event.title}</h2>
        <p>{props.event.start.toLocaleDateString()}</p>
        <Button
          isClose={true}
          onClick={(prev) => props.setIsModalEvent(!prev)}
          type="button"
        >
          X
        </Button>
        <Button
          onClick={() => {
            setShowVisitedModal(true);
          }}
        >
          Запись
        </Button>
        <Button
          onClick={(prev) => {
            store.deleteEvent(props.event.resource.id);
            props.setIsModalEvent(!prev);
          }}
        >
          Удалить событые
        </Button>
        <Button
          onClick={() => {
            store.signUpEvent(props.event.resource.id, store.user.id);
          }}
        >
          Буду
        </Button>
      </div>
    </div>
  );
};

observer(ModalEvent);
