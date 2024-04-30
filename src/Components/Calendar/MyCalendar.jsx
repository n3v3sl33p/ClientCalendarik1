import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment/moment";
import "./Calendar.module.css";
import { observer } from "mobx-react-lite";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallback } from "react";
import "moment/locale/ru";
import store from "../../store/store";
moment.locale("ru");
const localizer = momentLocalizer(moment);
export const MyCalendar = observer((props) => {
  const { eventList } = store;
  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...(isSelected && {
        style: {
          backgroundColor: "#000",
        },
      }),
      ...(moment(start).hour() < 12 && {
        className: "powderBlue",
      }),
      ...(true && {
        style: {
          backgroundColor: event.resource.color,
        },
      }),
    }),
    []
  );
  const handleClick = (event) => {
    props.setIsModalEvent(true);
    props.setSelectedEvent(event);
  };
  const message = {
    date: "Дата",
    time: "Время",
    event: "Событие",
    allDay: "Весь День",
    week: "Неделя",
    work_week: "Рабочая Неделя",
    day: "День",
    month: "Месяц",
    previous: "Назад",
    next: "Далее",
    yesterday: "Вчера",
    tomorrow: "Завтра",
    today: "Сегодня",
    agenda: "Agenda",

    noEventsInRange: "There are no events in this range.",
    /**
     * params {total} count of remaining events
     * params {remainingEvents} remaining events
     * params {events} all events in day
     */
    showMore: (total, remainingEvents, events) => `+${total} más`,
  };
  return (
    <div
      style={{
        height: "720px",
        width: "1380px",
        backgroundColor: "white",
        // marginLeft: "130px",
        borderRadius: "6px",
      }}
    >
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        events={eventList}
        eventPropGetter={eventPropGetter}
        onSelectEvent={handleClick}
        views={["month", "week", "day"]}
        messages={message}
      />
    </div>
  );
});
