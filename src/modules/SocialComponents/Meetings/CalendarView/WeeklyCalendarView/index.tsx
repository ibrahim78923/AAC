import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
export const WeeklyCalendarView = () => {
  return (
    <div>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        weekends={true} // Show weekends
        // slotDuration="00:30:00" // Set slot duration to 30 minutes
        //  slotLabelInterval="01:00:00" // Set interval for slot labels to 1 hour
        // slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }} // Display time in 24-hour format
        // columnHeaderFormat={{ weekday: 'long' }} // Display full weekday names in column headers
        allDaySlot={false} // Hide the all-day slot
        // Add events as needed
        events={[
          {
            title: 'Event 1',
            start: '2024-04-15T09:00:00',
            end: '2024-04-15T10:00:00',
          },
          // {
          //   title: 'Event 2',
          //   start: '2024-04-17T10:00:00',
          //   end: '2024-04-17T11:00:00',
          // },
          // Add more events as needed
        ]}
      />
    </div>
  );
};
