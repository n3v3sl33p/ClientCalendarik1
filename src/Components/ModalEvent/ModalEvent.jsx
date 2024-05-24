import { observer } from "mobx-react-lite";
import styles from "./Style.module.css";
import { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../../main";

import { Button } from "../Button/Button";
import { useClickOutside } from "../../Hooks/useClickOutside";
import TimeModal from "../timeModal/TimeModal";

export const ModalEvent = observer(
  ({ event, setIsModalEvent, setIsMarkVisited, setCurrentEvent }) => {
    const { store } = useContext(Context);
    const [showVisitedModal, setShowVisitedModal] = useState(false);
    const [comments, setComments] = useState();
    const menuRef = useRef(null);
    useClickOutside(menuRef, () => {
      setIsModalEvent((prev) => !prev);
      store.signUpError = null;
    });
    useEffect(() => {
      const fetchData = async () => {
        const response = await store.getAllComments(event.resource.id);
        setComments(response);
      };
      fetchData();
    }, []);
    return (
      <div className={styles.modal}>
        {showVisitedModal && (
          <MarkVisitedModal
            setShowVisitedModal={setShowVisitedModal}
            eventId={event.resource.id}
          />
        )}
        <div className={styles.modalContent} ref={menuRef}>
          <div className={styles.descriptionWithButton}>
            <div>
              <h2 className={styles.header}>{event.title}</h2>
              <p>{event.description}</p>
              <p>Начало:{event.start.toLocaleDateString()}</p>
            </div>
            <div className={styles.buttons}>
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
          <div className={styles.commentsContainer}>
            <h2 className={styles.commentHeader}>Комментарии</h2>
            {comments && (
              <ul className={styles.commentList}>
                {comments.map((obj) => (
                  <li key={obj.id}>
                    <div className={styles.commentContainer}>
                      <p className={styles.userName}>{obj.user_name}</p>
                      <p className={styles.comment}>{obj.comment}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {store.responseInfo && <TimeModal message={store.responseInfo} />}
      </div>
    );
  }
);
