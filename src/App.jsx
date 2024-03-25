import { useCallback, useContext, useEffect, useState } from "react";
import LogIn from "./Components/LogInComponents/LogIn";
import Registration from "./Components/RegistrComponents/Registr";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import { MyCalendar } from "./Components/Calendar/MyCalendar";
import ReactDatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./App.module.css";
import { ModalEvent } from "./Components/ModalEvent/ModalEvent";
import { Button } from "./Components/Button/Button";

registerLocale("ru", ru);

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
  const [eventError, setEventError] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);
  if (store.isAuth) {
    setInterval(() => {
      store.getAllEvent();
    }, 1000);
  }

  return (
    <>
      {isLogin && <LogIn setIsLogin={setIsLogin} />}
      {isReg && <Registration setIsReg={setIsReg} />}
      {isModalEvent && (
        <ModalEvent setIsModalEvent={setIsModalEvent} event={selectedEvent} />
      )}
      <div className="DivWButtons">
        <Button
          onClick={() => {
            setIsLogin((prev) => !prev);
          }}
        >
          Вход
        </Button>
        <Button onClick={() => setIsReg((prev) => !prev)}>Регистрация</Button>
        <Button onClick={() => store.logout()}>Выход</Button>
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
            onChange={(date) => {
              setEvent({ ...event, start: date.toISOString() });
            }}
            dateFormat="dd.MM.YYYY HH:mm"
            locale="ru"
          />
          <span style={{ marginTop: 10 }}>Конец мероприятия</span>
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
                resource: { color: "#e66465", id: 1 },
              });
            }}
          >
            Создать
          </Button>
        </div>
      </div>
      <Button
        onClick={() => {
          store.getAllSignUp(store.user.id);
        }}
      >
        Мои записи
      </Button>
      <Button>Мои посещения</Button>
      <Button
        onClick={() => {
          store.getAllUsersById(1);
        }}
      >
        На первый ивент записались
      </Button>
    </>
  );
}

export default observer(App);
