import { useEffect, useContext, useState, useReducer, useRef } from "react";
import { Context } from "../../main";
import styles from "./MyVisits.module.css";
import { useClickOutside } from "../../Hooks/useClickOutside";
import { observer } from "mobx-react-lite";

export const MyVisits = observer(
  ({ setIsMyVisits, setIsComment, setCurrentEvent }) => {
    const { store } = useContext(Context);
    const [eventList, setEventList] = useState([]);
    const [eventName, setEventName] = useState("");
    const menuRef = useRef(null);
    useClickOutside(menuRef, () => setIsMyVisits((prev) => !prev));

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await store.getAllVisitsUser(store.user.id);
          setEventList(response);
          console.error(response);
        } catch (error) {
          console.warn(error);
        }
      };
      fetchData();
    }, []);
    return (
      <div className={styles.wrapper}>
        <div className={styles.modalContent} ref={menuRef}>
          <h2 className={styles.header}>Мои посещения</h2>
          <input
            className={styles.input}
            type="text"
            placeholder="Название ивента"
            onChange={(e) => {
              setEventName(e.target.value);
            }}
          />
          {eventList ? (
            <ul className={styles.list}>
              {eventList
                .filter((event) =>
                  event.title
                    .toLowerCase()
                    .includes(eventName.toLocaleLowerCase())
                )
                .map((event) => (
                  <li key={event.id} className={styles.eventName}>
                    <div className={styles.container}>
                      <span className={styles.eventName}>{event.title}</span>
                      <button
                        className={styles.button}
                        onClick={() => {
                          setIsComment((prev) => !prev);
                          setIsMyVisits((prev) => !prev);
                          setCurrentEvent(event.id);
                        }}
                      >
                        Отзыв
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <p className={styles.eventName}>Нет</p>
          )}
        </div>
      </div>
    );
  }
);
