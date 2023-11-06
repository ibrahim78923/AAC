import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { DateFilter } from './DateFilter';
import { ManageWorkload } from './ManageWorkload';
import { UnassignedWork } from './UnassignedWork';
import { Filters } from './Filters';
import { Profile } from './Profile';
import { useRef, useState, Fragment } from 'react';
import styles from './Workload.module.scss';
import { WorkloadData } from './Workload.data';
import CircleIcon from '@mui/icons-material/Circle';
import { TodoIcon } from '@/assets/icons';
import { Editor } from './Editor';

export const Workload = () => {
  const calendarRef: any = useRef();
  const [onClickEvent, setOnClickEvent] = useState<any>({
    open: null,
    data: null,
  });

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
            <Tooltip
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: 'common.white',
                    boxShadow: 3,
                    maxWidth: 'unset',
                  },
                },
              }}
              title={
                <Fragment>
                  <Box display={'flex'} alignItems={'center'} gap={2} p={2}>
                    <CircleIcon
                      fontSize="small"
                      color={
                        eventInfo?.event?.extendedProps?.status === 'Completed'
                          ? 'primary'
                          : eventInfo?.event?.extendedProps?.status === 'To-Do'
                          ? 'secondary'
                          : 'warning'
                      }
                    />
                    <Typography variant="body1" color={'blue.main'}>
                      {eventInfo?.event?.extendedProps?.status}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box display={'flex'} alignItems={'center'} gap={2} p={2}>
                    <TodoIcon />
                    <Typography variant="h5" color={'blue.main'}>
                      {eventInfo?.event?.extendedProps?.ticketNo}
                    </Typography>
                    <Typography variant="body1" color={'blue.main'}>
                      {eventInfo?.event?.extendedProps?.description}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    px={2}
                    ml={2}
                    color={'custom.main'}
                    pb={2}
                  >
                    {dayjs(eventInfo?.event?.start).format(
                      'DD MMM, YYYY hh:MM A',
                    )}{' '}
                    -{' '}
                    {dayjs(eventInfo?.event?.end).format(
                      'DD MMM, YYYY hh:MM A',
                    )}
                  </Typography>
                  <Divider />
                  <Button
                    color="secondary"
                    onClick={() =>
                      setOnClickEvent({
                        open: true,
                        data: eventInfo?.event,
                      })
                    }
                  >
                    ADD PLANNED EFFORT
                  </Button>
                </Fragment>
              }
            >
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={'1rem'}
                sx={{ cursor: 'pointer' }}
                overflow={'hidden'}
                onClick={() =>
                  setOnClickEvent({
                    open: true,
                    data: eventInfo?.event,
                  })
                }
              >
                <Avatar
                  src={eventInfo?.event?.extendedProps?.img?.src}
                  sx={{ width: 28, height: 28 }}
                />
                <Typography variant={'body2'}>
                  {eventInfo?.event?.extendedProps?.ticketNo}{' '}
                  {eventInfo?.event?.extendedProps?.description}
                </Typography>
              </Box>
            </Tooltip>
          );
        }}
      />

      <Editor
        openDrawer={onClickEvent?.open}
        onClose={() => setOnClickEvent({ open: null, data: null })}
        data={onClickEvent?.data}
      />
    </Box>
  );
};
