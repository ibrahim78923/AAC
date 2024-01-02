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
import { DateFilter } from './DateFilter';
import { ManageWorkload } from './ManageWorkload';
import { UnassignedWork } from './UnassignedWork';
import { Filters } from './Filters';
import { Profile } from './Profile';
import { useRef, useState, Fragment } from 'react';
import styles from './Workload.module.scss';
import CircleIcon from '@mui/icons-material/Circle';
import { TodoIcon } from '@/assets/icons';
import { useGetWorkloadQuery } from '@/services/airServices/workload';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { UpdateWorkloadTask } from './UpdateWorkloadTask';

export const Workload = () => {
  const calendarRef: any = useRef();
  const [onClickEvent, setOnClickEvent] = useState<any>({
    open: null,
    data: null,
  });

  const todayDate: string = dayjs()?.format('YYYY-MM-DD');
  const [dateCalendar, setDateCalendar] = useState(todayDate);
  calendarRef?.current?.getApi()?.gotoDate(dateCalendar);

  const { data, isLoading, isFetching, isError } = useGetWorkloadQuery(
    {
      startDate: dayjs(dateCalendar)?.startOf('week')?.format(),
    },
    { refetchOnMountOrArgChange: true },
  );

  const COMPLETED = 'completed';
  const IN_PROGRESS = 'inprogress';

  return (
    <Box className={styles?.calendarWrapper}>
      <Typography variant="h3" mb={3}>
        Workload
      </Typography>
      {isError ? (
        <ApiErrorState />
      ) : isLoading || isFetching ? (
        <SkeletonTable />
      ) : (
        <Fragment>
          <Grid container spacing={4} mb={4}>
            <Grid item xs={12} lg={3}>
              <DateFilter setDateCalendar={setDateCalendar} />
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
              display={'flex'}
              justifyContent={'center'}
            >
              <Profile />
            </Grid>
            <Grid item xs={12} lg={5} textAlign={{ xs: 'center', lg: 'end' }}>
              <ManageWorkload />

              <UnassignedWork />

              <Filters />
            </Grid>
          </Grid>

          <FullCalendar
            ref={calendarRef}
            dayHeaderContent={(data: any) => (
              <Box sx={{ cursor: 'pointer' }}>
                {dayjs(data?.date)?.format('ddd - DD')}
                <Typography variant={'h6'}>
                  {data?.day?.allDayEvents?.length}
                </Typography>
              </Box>
            )}
            headerToolbar={false}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridWeek"
            events={data}
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
                            eventInfo?.event?.extendedProps?.status?.toLowerCase() ===
                            COMPLETED
                              ? 'primary'
                              : eventInfo?.event?.extendedProps?.status
                                    ?.toLowerCase()
                                    ?.replace(/\s/g, '') === IN_PROGRESS
                                ? 'warning'
                                : 'secondary'
                          }
                        />
                        <Typography
                          variant="body1"
                          color={'blue.main'}
                          textTransform={'capitalize'}
                        >
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
                        {dayjs(eventInfo?.event?.start)?.format(
                          'DD MMM, YYYY hh:MM A',
                        )}{' '}
                        -{' '}
                        {dayjs(eventInfo?.event?.end)?.format(
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
                      sx={{ width: 28, height: 28, color: 'primary.main' }}
                    />
                    <Typography variant={'body2'} color={'common.white'}>
                      {eventInfo?.event?.extendedProps?.ticketNo}{' '}
                      {eventInfo?.event?.extendedProps?.description}
                    </Typography>
                  </Box>
                </Tooltip>
              );
            }}
          />
        </Fragment>
      )}

      <UpdateWorkloadTask
        openDrawer={onClickEvent?.open}
        onClose={() => setOnClickEvent({ open: null, data: null })}
        data={onClickEvent?.data}
      />
    </Box>
  );
};
