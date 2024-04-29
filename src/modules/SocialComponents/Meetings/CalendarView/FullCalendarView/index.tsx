import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { eventArray } from '../CalendarView.data';
import { EventDialog } from '../EventDialog';
import styles from '../CalendarView.module.scss';
import { Box } from '@mui/material';
export const FullCalendarView = (props: any) => {
  const {
    currentView,
    openEventModal,
    setOpenEventModal,
    eventData,
    handleEventClick,
  } = props;

  return (
    <Box>
      {currentView === 'timeGridDay' && (
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridDay"
          allDaySlot={false}
          weekends={true}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: true,
          }}
          events={eventArray}
          eventClick={handleEventClick}
          eventClassNames={styles?.eventClassNames}
        />
      )}
      {currentView === 'timeGridWeek' && (
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          weekends={true}
          allDaySlot={false}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: true,
          }}
          events={eventArray}
          eventClick={handleEventClick}
          eventClassNames={styles?.eventClassNames}
        />
      )}
      {currentView === 'dayGridMonth' && (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          allDaySlot={false}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: true,
          }}
          events={eventArray}
          eventClick={handleEventClick}
          eventClassNames={styles?.eventClassNames}
        />
      )}
      {currentView === 'multiMonthYear' && (
        <FullCalendar
          plugins={[multiMonthPlugin]}
          initialView="multiMonthYear"
          weekends={true}
          allDaySlot={false}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: true,
          }}
          events={eventArray}
          eventClick={handleEventClick}
          eventClassNames={styles?.eventClassNames}
        />
      )}
      {openEventModal && (
        <EventDialog
          openEventModal={openEventModal}
          setOpenEventModal={setOpenEventModal}
          eventData={eventData}
        />
      )}
    </Box>
  );
};
