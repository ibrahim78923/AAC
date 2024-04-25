import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box } from '@mui/material';
import styles from '../CalendarView.module.scss';

export const TodayCalendarView = () => {
  const today = new Date();
  const desiredDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ); // Today's date
  const dateStr = desiredDate.toISOString().split('T')[0];
  return (
    <>
      <Box className={styles?.calendarWrapper}>
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridDay"
          allDaySlot={false}
          events={[
            {
              title: 'Event 1',
              start: dateStr + 'T09:00:00',
              end: dateStr + 'T10:00:00',
            },
            // Add more events as needed
          ]}
        />
      </Box>
    </>
  );
};
