import { useContext, useState, useEffect, useRef } from "react";
import styles from "./Style.module.css";
import { Context } from "../../main";
import { Button } from "../Button/Button";
import { useClickOutside } from "../../Hooks/useClickOutside";

export const MarkVisitedModal = ({ setIsMarkVisited, eventId }) => {
  const { store } = useContext(Context);
  const [userList, setUserList] = useState([]);
  const [userName, setUserName] = useState("");
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setIsMarkVisited((prev) => !prev));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await store.getAllUsersById(eventId);
        setUserList(list);
      } catch (error) {
        console.error("Ошибка получения списка пользователей:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} ref={menuRef}>
        <input
          type="text"
          className={styles.input}
          value={userName}
          placeholder="Имя участника"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        {userList ? (
          <ul>
            {userList
              .filter((user) =>
                user.full_name
                  .toLowerCase()
                  .includes(userName.toLocaleLowerCase())
              )
              .map((user) => (
                <li key={user.id}>
                  <div>{user.full_name}</div>
                  <Button
                    onClick={() => {
                      store.markVisit(eventId, user.id, true);
                    }}
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => {
                      store.markVisit(eventId, user.id, false);
                    }}
                  >
                    -
                  </Button>
                </li>
              ))}
          </ul>
        ) : (
          <p>Никто не записался</p>
        )}
      </div>
    </div>
  );
};
