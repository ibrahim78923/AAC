import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { eventArray } from '../CalendarView.data';
import { EventDialog } from '../EventDialog';
import styles from '../CalendarView.module.scss';
import { Box } from '@mui/material';
import { CALENDER_TYPES } from '@/constants/strings';
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
      {currentView === CALENDER_TYPES?.DAY_VIEW_CALENDER && (
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView={CALENDER_TYPES?.DAY_VIEW_CALENDER}
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
      {currentView === CALENDER_TYPES?.WEEK_VIEW_CALENDER && (
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView={CALENDER_TYPES?.WEEK_VIEW_CALENDER}
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
      {currentView === CALENDER_TYPES?.MONTH_VIEW_CALENDER && (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView={CALENDER_TYPES?.MONTH_VIEW_CALENDER}
          dayMaxEventRows={true}
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
      {currentView === CALENDER_TYPES?.YEAR_VIEW_CALENDER && (
        <FullCalendar
          plugins={[multiMonthPlugin]}
          initialView={CALENDER_TYPES?.YEAR_VIEW_CALENDER}
          dayMaxEventRows={true}
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
