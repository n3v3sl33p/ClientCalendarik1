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

  return (
    <div style={{ height: "600px", width: "80%" }}>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        events={eventList}
        eventPropGetter={eventPropGetter}
        onSelectEvent={handleClick}
        views={["month", "week", "day"]}
      />
    </div>
  );
});
