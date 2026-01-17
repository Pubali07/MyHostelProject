// src/pages/AppointmentsCalendar.jsx

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// Only VALID css for v5:
import "@fullcalendar/daygrid/main.css";

import styles from "./AppointmentsCalendar.module.css";

const AppointmentsCalendar = ({ appointments, onEventClick }) => {

  const events = appointments.map(app => ({
    id: app._id,
    title: app.name,
    date: app.date,
    color: "#d67c4f",
    extendedProps: app
  }));

  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => onEventClick(info.event.extendedProps)}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth"
        }}
      />
    </div>
  );
};

export default AppointmentsCalendar;
