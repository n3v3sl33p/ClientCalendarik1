import { useCallback, useContext, useEffect, useState } from "react";
import LogIn from "./Components/LogInComponents/LogIn";
import Registration from "./Components/RegistrComponents/Registr";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import { MyCalendar } from "./Components/Calendar/MyCalendar";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./App.module.css";
import { ModalEvent } from "./Components/ModalEvent/ModalEvent";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isReg, setIsReg] = useState(false);
  const [isModalEvent, setIsModalEvent] = useState(false);
  const { store } = useContext(Context);
  const [event, setEvent] = useState({
    start: "",
    end: "",
    title: "",
    resource: { color: "#f6b73c", id: 1 },
  });
  const [selectedEvent, setSelectedEvent] = useState({});

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  setInterval(() => {
    store.getAllEvent();
  }, 1000);

  return (
    <>
      {isLogin && <LogIn setIsLogin={setIsLogin} />}
      {isReg && <Registration setIsReg={setIsReg} />}
      {isModalEvent && (
        <ModalEvent setIsModalEvent={setIsModalEvent} event={selectedEvent} />
      )}
      <div className="DivWButtons">
        <button className="Button1" onClick={() => setIsLogin((prev) => !prev)}>
          Вход
        </button>
        <button className="Button2" onClick={() => setIsReg((prev) => !prev)}>
          Регистрация
        </button>
        <button className="Button2" onClick={() => store.logout()}>
          Выход
        </button>
      </div>
      <h2>{store.isAuth ? `${store.user.email}` : "АВТОРИЗУЙТЕСЬ"}</h2>
      <div className={styles.container}>
        {
          <MyCalendar
            setIsModalEvent={setIsModalEvent}
            setSelectedEvent={setSelectedEvent}
          />
        }
        <div className={styles.addEventContainer}>
          <h2>Добавить мероприятие</h2>
          <input
            type="text"
            placeholder="Мероприятие"
            value={event.title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
            className={styles.eventName}
          />
          <span>Начало мероприятия</span>
          <ReactDatePicker
            showIcon
            showTimeInput
            selected={event.start}
            onChange={(date) =>
              setEvent({ ...event, start: date.toISOString() })
            }
            dateFormat="yyyy-mm-dd hh:mm:ss"
          />
          <span style={{ marginTop: 10 }}>Конец мероприятия</span>
          <ReactDatePicker
            showIcon
            showTimeInput
            timeFormat="p"
            selected={event.end}
            onChange={(date) => setEvent({ ...event, end: date.toISOString() })}
            dateFormat="yyyy-mm-dd hh:mm:ss"
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
          <button
            className={styles.button}
            type="button"
            disabled={
              event.start === "" || event.end === "" || event.title === ""
            }
            onClick={() => {
              console.log(event);
              store.addEvent(event);
              setEvent({
                start: "",
                end: "",
                title: "",
                resource: { color: "#e66465", id: 1 },
              });
            }}
          >
            Создать
          </button>
        </div>
      </div>
    </>
  );
}

export default observer(App);
