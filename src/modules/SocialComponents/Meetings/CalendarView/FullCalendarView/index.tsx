import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { eventArray } from '../CalendarView.data';
import { EventDialog } from '../EventDialog';

export const FullCalendarView = (props: any) => {
  const {
    currentView,
    openEventModal,
    setOpenEventModal,
    eventData,
    handleEventClick,
  } = props;

  return (
    <>
      {currentView === 'timeGridDay' && (
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridDay"
          allDaySlot={false}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: true,
          }}
          events={eventArray}
          eventClick={handleEventClick}
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
        />
      )}
      {currentView === 'dayGridMonth' && (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          allDaySlot={false}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: true,
          }}
          events={eventArray}
          eventClick={handleEventClick}
        />
      )}
      {currentView === 'multiMonthYear' && (
        <FullCalendar
          plugins={[multiMonthPlugin]}
          initialView="multiMonthYear"
          allDaySlot={false}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: true,
          }}
          events={eventArray}
          eventClick={handleEventClick}
        />
      )}
      {openEventModal && (
        <EventDialog
          openEventModal={openEventModal}
          setOpenEventModal={setOpenEventModal}
          eventData={eventData}
        />
      )}
    </>
  );
};
