// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
import { Box, Grid, Typography } from '@mui/material';
// import dayjs from 'dayjs';
// import { DateCalendar } from '@mui/x-date-pickers';
import { DateFilter } from './DateFilter';
import { ManageWorkload } from './ManageWorkload';
import { UnassignedWork } from './UnassignedWork';
import { Filters } from './Filters';
import { Profile } from './Profile';

export const Workload = () => {
  return (
    <Box>
      <Typography variant="h3" mb={3}>
        Workload
      </Typography>

      <Grid container spacing={4} mb={2}>
        <Grid item xs={12} md={3}>
          <DateFilter />
        </Grid>
        <Grid item xs={12} md={4} display={'flex'} justifyContent={'center'}>
          <Profile />
        </Grid>
        <Grid item xs={12} md={5} textAlign={'end'}>
          <ManageWorkload />

          <UnassignedWork />

          <Filters />
        </Grid>
      </Grid>

      {/* <FullCalendar
        dayHeaderFormat={(date: {
          start: {
            marker: string | number | Date | dayjs.Dayjs | null | undefined;
          };
        }) => {
          return dayjs(date.start.marker).format('dddd');
        }}
        customButtons={{
          datePicker: {
            text: 'Button!',
            click: function () {
              <DateCalendar />;
            },
          },
        }}
        headerToolbar={false}
        plugins={[dayGridPlugin, interactionPlugin]}
        // eventMouseEnter={(e: any) => {
        //   //   setTooltip(() => ({
        //   //     title: e.event.title,
        //   //     start: dayjs(e.event.start).format('MMMM DD,YYYY'),
        //   //     end: dayjs(e.event.end).format('MMMM DD,YYYY'),
        //   //     open: true,
        //   //     anchor: e.el,
        //   //     id: 'calendar-popover',
        //   //   }));
        // }}
        initialView="dayGridWeek"
        events={[
          {
            id: '1',
            title: 'The Demo',
            start: '2023-10-30',
            end: '2023-10-30',
            className: 'demo-event',
          },
          {
            id: '2',
            title: 'The Reminder',
            start: '2023-10-30',
            end: '2023-10-31',
            className: 'reminder-event',
          },
          {
            id: '3',
            title: 'The Meeting',
            start: '2023-10-31',
            end: '2023-11-01',
            className: 'meeting-event',
          },
        ]}
        eventClassNames="events-style font-family-roboto"
        eventTimeFormat={{
          hour: 'numeric',
          meridiem: true,
        }}
      /> */}
    </Box>
  );
};
