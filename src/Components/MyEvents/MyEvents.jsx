import { useEffect, useContext, useState, useReducer, useRef } from "react";
import { Context } from "../../main";
import styles from "./MyEvents.module.css";
import { useClickOutside } from "../../Hooks/useClickOutside";
import { observer } from "mobx-react-lite";

export const MyEvents = observer(({ setIsMyEvents }) => {
  const { store } = useContext(Context);
  const [eventList, setEventList] = useState([]);
  const [eventName, setEventName] = useState("");
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setIsMyEvents((prev) => !prev));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await store.getAllSignUp(store.user.id);
        setEventList(response.data);
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
        <h2 className={styles.header}>Мои записи</h2>
        <input
          className={styles.input}
          type="text"
          placeholder="Название ивента"
          onChange={(e) => {
            setEventName(e.target.value);
          }}
        />
        {eventList ? (
          <ul>
            {eventList
              .filter((event) =>
                event.title
                  .toLowerCase()
                  .includes(eventName.toLocaleLowerCase())
              )
              .map((event) => (
                <li key={event.id}>{event.title}</li>
              ))}
          </ul>
        ) : (
          <p>Нет</p>
        )}
      </div>
    </div>
  );
});
