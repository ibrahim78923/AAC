import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { DateFilter } from './DateFilter';
import { ManageWorkload } from './ManageWorkload';
import { UnassignedWork } from './UnassignedWork';
import { Filters } from './Filters';
import { Profile } from './Profile';
import { useRef, useState } from 'react';
import styles from './Workload.module.scss';
import { UserProfileImage } from '@/assets/images';
import { WorkloadData } from './Workload.data';

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
        events={WorkloadData}
        eventTimeFormat={{
          hour: 'numeric',
          meridiem: true,
        }}
        eventClassNames={styles?.eventClassNames}
        eventContent={(eventInfo: any) => {
          return (
            <Box display={'flex'} alignItems={'center'} gap={'1rem'}>
              <Avatar
                src={UserProfileImage?.src}
                sx={{ width: 28, height: 28 }}
              />
              <Typography variant={'body2'}>
                {eventInfo?.event?.title}
              </Typography>
            </Box>
          );
        }}
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
      />
    </Box>
  );
};
