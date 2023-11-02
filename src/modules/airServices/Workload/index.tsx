import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { DateFilter } from './DateFilter';
import { ManageWorkload } from './ManageWorkload';
import { UnassignedWork } from './UnassignedWork';
import { Filters } from './Filters';
import { Profile } from './Profile';
import { useRef, useState } from 'react';
import styles from './Workload.module.scss';

export const Workload = () => {
  const calendarRef: any = useRef();

  const todayDate: string = dayjs().format('YYYY-MM-DD');
  const [dateCalendar, setDateCalendar] = useState(todayDate);
  calendarRef?.current?.getApi()?.gotoDate(dateCalendar);

  return (
    <Box className={styles.calendarWrapper}>
      <Typography variant="h3" mb={3}>
        Workload
      </Typography>

      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} md={3}>
          <DateFilter setDateCalendar={setDateCalendar} />
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

      <FullCalendar
        ref={calendarRef}
        dayHeaderFormat={(date: any) => {
          return dayjs(date?.start?.marker).format('ddd - DD');
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
        initialView="dayGridWeek"
        // eventMouseEnter={(e: any) => {
        // setTooltip(() => ({
        //   title: e.event.title,
        //   start: dayjs(e.event.start).format('MMMM DD,YYYY'),
        //   end: dayjs(e.event.end).format('MMMM DD,YYYY'),
        //   open: true,
        //   anchor: e.el,
        //   id: 'calendar-popover',
        // }));
        // }}
        events={[
          {
            title: 'ANC',
            start: '2023-11-02T15:30:00',
            className: styles.completed,
          },
        ]}
        eventTimeFormat={{
          hour: 'numeric',
          meridiem: true,
        }}
        // eventContent={ function(arg, createElement) {
        //   var innerText

        //   if (arg.event.extendedProps.isUrgent) {
        //     innerText = 'urgent event'
        //   } else {
        //     innerText = 'normal event'
        //   }

        //   return createElement('img', {}, arg.event.img.src)
        // }}
      />
    </Box>
  );
};
