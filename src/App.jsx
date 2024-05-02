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
import { UserIcon } from "./Components/UserIcon/UserIcon";
import { AddEvent } from "./Components/addEvent/AddEvent";
import { SideBar } from "./Components/SideBar/SideBar";
import { MyEvents } from "./Components/MyEvents/MyEvents";
registerLocale("ru", ru);

export const App = observer(() => {
  const [isLogin, setIsLogin] = useState(false);
  const [isReg, setIsReg] = useState(false);
  const [isModalEvent, setIsModalEvent] = useState(false);
  const { store } = useContext(Context);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [personeScore, setPersoneScore] = useState(null);
  const [isSideBar, setIsSideBar] = useState(false);
  const [isAddEvent, setIsAddEvent] = useState(false);
  const [isMyEvents, setIsMyEvents] = useState(false);

  useEffect(() => {
    const fetchScore = async () => {
      const score = await store.getPersoneScore(store.user.id);
      setPersoneScore(score.points);
    };
    if (localStorage.getItem("token")) {
      store.checkAuth();
      fetchScore(store.user.id);
    }
    if (store.user.id) {
      fetchScore();
    }
  }, [store.user.id]);
  if (store.isAuth) {
    setInterval(() => {
      store.getAllEvent();
    }, 1000);
  }

  return (
    <>
      {isAddEvent && <AddEvent setIsAddEvent={setIsAddEvent} />}
      {isMyEvents && <MyEvents setIsMyEvents={setIsMyEvents} />}
      {isLogin && <LogIn setIsLogin={setIsLogin} />}
      {isReg && <Registration setIsReg={setIsReg} />}
      {isModalEvent && (
        <ModalEvent setIsModalEvent={setIsModalEvent} event={selectedEvent} />
      )}
      {isSideBar && (
        <SideBar
          setIsSideBar={setIsSideBar}
          setIsAddEvent={setIsAddEvent}
          setIsMyEvents={setIsMyEvents}
        />
      )}

      {!store.isAuth && (
        <div className="DivWButtons">
          <Button
            onClick={() => {
              setIsLogin((prev) => !prev);
            }}
          >
            Вход
          </Button>
          <Button onClick={() => setIsReg((prev) => !prev)}>Регистрация</Button>
        </div>
      )}

      {store.isAuth && (
        <div className="DivWButtons">
          <button
            className={styles.sideMenuButton}
            onClick={() => {
              setIsSideBar((prev) => !prev);
            }}
          />
          <UserIcon />
        </div>
      )}
      <p>{store.isAuth ? `${personeScore}` : null}</p>
      <div className={styles.container}>
        {
          <MyCalendar
            setIsModalEvent={setIsModalEvent}
            setSelectedEvent={setSelectedEvent}
          />
        }
        {/* <AddEvent /> */}
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
      <Button
        onClick={() => {
          store.getPersoneScore(store.user.id);
        }}
      >
        Knopka
      </Button>
    </>
  );
});
