import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Box } from '@mui/material';
import ResourcePlugin from '@fullcalendar/resource';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import useCalender from './useCalender';
import Filters from './Filters';

const Calender = () => {
  const {
    fullCalendarRef,
    nonScheduledUser,
    WorkScheduleEvent,
    NonSchedulerWorkScheduleEvent,
    WorkScheduleUser,
    nonSchedulerWorkScheduleUser,
    eventContentHandler,
    handleSlotContent,
    handleResourceRender,
    handleResourceHeaderContent,
    currentDate,
    calendarDate,
    handlePrevClick,
    handleNextClick,
    calendarDateClick,
  } = useCalender();

  return (
    <>
      <Box className="apply-work-wrapper">
        <Filters />

        <FullCalendar
          ref={fullCalendarRef}
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          plugins={[
            resourceTimelinePlugin,
            interactionPlugin,
            dayGridPlugin,
            ResourcePlugin,
          ]}
          headerToolbar={{
            left: `Prev today Next`,
            right: '',
            center: '',
          }}
          customButtons={{
            today: {
              text: calendarDate,
              click: function () {},
            },
            Prev: {
              text: '<',
              click: handlePrevClick,
            },
            Next: {
              text: '>',
              click: handleNextClick,
            },
          }}
          buttonText={{
            today: currentDate,
          }}
          titleFormat={{
            month: 'short',
            day: 'numeric',
            weekday: 'short',
          }}
          initialView="dayGridMonth"
          noEventsText="No Events to Show"
          resources={
            nonScheduledUser ? nonSchedulerWorkScheduleUser : WorkScheduleUser
          }
          events={
            nonScheduledUser ? NonSchedulerWorkScheduleEvent : WorkScheduleEvent
          }
          editable={true}
          droppable={true}
          slotMinWidth={200}
          resourceAreaWidth={240}
          eventMinWidth={200}
          eventContent={eventContentHandler}
          resourceAreaHeaderContent={handleResourceHeaderContent}
          resourceLabelContent={handleResourceRender}
          slotDuration="24:00:00"
          slotLabelContent={handleSlotContent}
          slotLabelFormat={[
            { day: '2-digit', month: 'long', year: 'numeric', weekday: 'long' },
          ]}
          dateClick={calendarDateClick}
          // dateClick={()=>router.push('/air-marketer/social-marketing/create-post')}
          // eventClick={() =>
          //   router.push('/air-marketer/social-marketing/create-posts')
          // }
        />
      </Box>
    </>
  );
};
export default Calender;
