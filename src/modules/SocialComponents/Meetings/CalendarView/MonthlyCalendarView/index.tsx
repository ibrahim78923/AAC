import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export const MonthlyCalendarView = () => {
  const today = new Date();

  // Format today's date as a string in YYYY-MM-DD format
  const todayStr = today.toISOString().split('T')[0];
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          {
            title: 'Today',
            start: todayStr,
            end: todayStr,
          },
        ]}
      />
    </>
  );
};
