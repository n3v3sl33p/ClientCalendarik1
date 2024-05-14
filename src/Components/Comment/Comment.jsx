import { useContext, useRef, useState } from "react";
import styles from "./Comment.module.css";
import { useClickOutside } from "../../Hooks/useClickOutside";
import { Button } from "../Button/Button";
import { Context } from "../../main";
export const Comment = ({ setIsComment, eventId }) => {
  const [comment, setComment] = useState("");
  const { store } = useContext(Context);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setIsComment((prev) => !prev));
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} ref={menuRef}>
        <h2 className={styles.header}>Отзыв</h2>
        <textarea
          name=""
          id=""
          placeholder="Ваше мнение"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <Button
          onClick={() => {
            store.postComment(eventId, store.user.id, comment);
            setComment("");
            setIsComment((prev) => !prev);
          }}
        >
          Отправить
        </Button>
      </div>
    </div>
  );
};
