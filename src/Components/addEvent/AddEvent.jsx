import ReactDatePicker from "react-datepicker";
import { useState, useContext, useRef } from "react";
import styles from "./AddEvent.module.css";
import { Button } from "../Button/Button";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import { useClickOutside } from "../../Hooks/useClickOutside";
import TimeModal from "../timeModal/TimeModal";

export const AddEvent = observer(({ setIsAddEvent }) => {
  const { store } = useContext(Context);
  const menuRef = useRef(null);
  const [event, setEvent] = useState({
    start: "",
    end: "",
    title: "",
    description: "",
    resource: { color: "#f6b73c", id: 1 },
  });
  const [eventError, setEventError] = useState();

  useClickOutside(menuRef, () => {
    setIsAddEvent((prev) => !prev);
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.addEventContainer} ref={menuRef}>
        <h2 className={styles.addEventHeader}>Добавить мероприятие</h2>
        <input
          type="text"
          placeholder="Мероприятие"
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
          className={styles.eventName}
        />
        <span className={styles.addEventSpan}>Начало мероприятия</span>
        <ReactDatePicker
          showIcon
          showTimeInput
          selected={event.start}
          onChange={(date) => {
            setEvent({ ...event, start: date.toISOString() });
          }}
          dateFormat="dd.MM.YYYY HH:mm"
          locale="ru"
        />
        <span className={styles.addEventSpan}>Конец мероприятия</span>
        <ReactDatePicker
          showIcon
          showTimeInput
          selected={event.end}
          onChange={(date) => setEvent({ ...event, end: date.toISOString() })}
          dateFormat="dd.MM.YYYY HH:mm"
          locale="ru"
        />
        <input
          type="color"
          value={event.resource.color}
          onChange={(e) =>
            setEvent({
              ...event,
              resource: { color: e.target.value },
            })
          }
        />
        {eventError && <p>{eventError}</p>}
        <textarea
          name="eventInfo"
          id="1"
          cols="30"
          rows="10"
          placeholder="Описание ивента"
          className={styles.textarea}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          value={event.description}
        />
        <Button
          disabled={
            event.start === "" || event.end === "" || event.title === ""
          }
          onClick={() => {
            if (event.start > event.end) {
              setEventError("Неправильная дата");
              return;
            }
            store.addEvent(event);

            setEvent({
              start: "",
              end: "",
              title: "",
              description: "",
              resource: { color: "#e66465", id: 1 },
            });
          }}
        >
          Создать
        </Button>
        {store.responseInfo && <TimeModal message={store.responseInfo} />}
      </div>
    </div>
  );
});
