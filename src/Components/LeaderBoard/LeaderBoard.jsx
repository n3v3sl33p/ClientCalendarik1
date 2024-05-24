import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Context } from "../../main";
import { useContext, useState } from "react";
import styles from "./LeaderBoard.module.css";
export const LeaderBoard = observer(() => {
  const { store } = useContext(Context);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await store.getLidderBoard();
        setUserList(response);
      } catch (error) {
        console.warn(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>Таблица лидеров</h2>
      {userList && (
        <ul className={styles.list}>
          {userList.map((user) => (
            <li key={user.name}>
              <div className={styles.container}>
                <span className={styles.text}>{user.name}</span>
                <span className={styles.text}>{user.points}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
