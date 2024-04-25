import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import multiMonthPlugin from '@fullcalendar/multimonth';

export const YearlyCalendarView = () => {
  const calendarRef = useRef(null);

  // Initialize the FullCalendar instance
  useEffect(() => {
    // Check if the calendarRef is initialized
    if (calendarRef?.current) {
      //const calendar = calendarRef?.current?.getApi();
      // Get the current year
      // const currentYear = new Date()?.getFullYear();
      // Set the date range to the current year
      // calendar?.gotoDate(new Date(currentYear, 0)); // Go to January of the current year
      // calendar?.gotoDate(new Date(currentYear, 11)); // Go to December of the current year
    }
  }, [calendarRef.current]);

  return (
    <div className="yearly-view-calendar">
      <FullCalendar
        //   ref={calendarRef}
        plugins={[multiMonthPlugin]}
        initialView="multiMonthYear"
        // views={{
        //   multiMonthFourMonth: {
        //     type: 'multiMonth',
        //     duration: { months: 12 }
        //   }
        // }}
      />
    </div>
  );
};
