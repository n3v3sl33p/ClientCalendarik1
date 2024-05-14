import { useContext, useEffect, useState } from "react";
import LogIn from "./Components/LogInComponents/LogIn";
import Registration from "./Components/RegistrComponents/Registr";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import { MyCalendar } from "./Components/Calendar/MyCalendar";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./App.module.css";
import { ModalEvent } from "./Components/ModalEvent/ModalEvent";
import { Button } from "./Components/Button/Button";
import { UserIcon } from "./Components/UserIcon/UserIcon";
import { AddEvent } from "./Components/addEvent/AddEvent";
import { SideBar } from "./Components/SideBar/SideBar";
import { MarkVisitedModal } from "./Components/MarkVisited/MarkVisitedModal";
import { MyEvents } from "./Components/MyEvents/MyEvents";
import { MyVisits } from "./Components/MyVisits/MyVisits";
import { Comment } from "./Components/Comment/Comment";
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
  const [isMarkVisited, setIsMarkVisited] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(false);
  const [isMyVisits, setIsMyVisits] = useState(false);
  const [isComment, setIsComment] = useState(false);
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
        <ModalEvent
          setIsModalEvent={setIsModalEvent}
          event={selectedEvent}
          setCurrentEvent={setCurrentEvent}
          setIsMarkVisited={setIsMarkVisited}
        />
      )}
      {isSideBar && (
        <SideBar
          setIsSideBar={setIsSideBar}
          setIsAddEvent={setIsAddEvent}
          setIsMyEvents={setIsMyEvents}
          setIsMyVisits={setIsMyVisits}
        />
      )}
      {isMarkVisited && (
        <MarkVisitedModal
          setIsMarkVisited={setIsMarkVisited}
          eventId={currentEvent}
        />
      )}
      {isMyVisits && (
        <MyVisits
          setIsMyVisits={setIsMyVisits}
          setIsComment={setIsComment}
          setCurrentEvent={setCurrentEvent}
        />
      )}
      {isComment && (
        <Comment setIsComment={setIsComment} eventId={currentEvent} />
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
      </div>
    </>
  );
});
