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
import { useRef, useState, Fragment, useEffect } from 'react';
import styles from './Workload.module.scss';
import CircleIcon from '@mui/icons-material/Circle';
import { TodoIcon } from '@/assets/icons';
import { useLazyGetWorkloadQuery } from '@/services/airServices/workload';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { UpdateWorkloadTask } from './UpdateWorkloadTask';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

export const Workload = () => {
  const calendarRef = useRef<any>(null);
  const router: any = useRouter();

  const [onClickEvent, setOnClickEvent] = useState<any>({
    open: null,
    data: null,
  });
  const [addPlannedEffort, setAddPlannedEffort] = useState<any>({
    open: null,
    data: null,
  });
  const [dateCalendar, setDateCalendar] = useState<any>(
    dayjs()?.startOf('week')?.format('YYYY-MM-DD'),
  );
  const [selected, setSelected] = useState<any>(null);
  const [trigger, status] = useLazyGetWorkloadQuery();

  useEffect(() => {
    trigger({
      startDate: dayjs()?.startOf('week')?.add(1, 'day')?.toISOString(),
      endDate: dayjs()?.endOf('week')?.toISOString(),
      userIds: selected?._id,
    });
  }, [selected]);

  const COMPLETED = 'Done';
  const IN_PROGRESS = 'In-Progress';

  if (status?.isError) return <ApiErrorState />;

  if (status?.isLoading || status?.isFetching) return <SkeletonTable />;

  const dateChangeHandler = async (date: any) => {
    setDateCalendar(date);
    try {
      await trigger({
        startDate: dayjs(date)?.startOf('week')?.add(1, 'day')?.toISOString(),
        endDate: dayjs(date)?.endOf('week')?.toISOString(),
        userIds: selected?._id,
      })?.unwrap();

      calendarRef?.current?.getApi()?.gotoDate(date);
    } catch (error: any) {}
  };

  return (
    <Box className={styles?.calendarWrapper}>
      <Typography variant="h3" mb={3}>
        Workload
      </Typography>

      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} lg={3}>
          <DateFilter
            setDateCalendar={dateChangeHandler}
            dateCalendar={dateCalendar}
          />
        </Grid>
        <Grid item xs={12} lg={4} display={'flex'} justifyContent={'center'}>
          <Profile selected={selected} setSelected={setSelected} />
        </Grid>
        <Grid
          item
          xs={12}
          lg={5}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          flexWrap={'wrap'}
          gap={2}
        >
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
        events={status?.data}
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
                    borderRadius: 3,
                  },
                },
              }}
              title={
                <Fragment>
                  <Box display={'flex'} alignItems={'center'} gap={1} p={2}>
                    <CircleIcon
                      fontSize="small"
                      color={
                        eventInfo?.event?.extendedProps?.status === COMPLETED
                          ? 'primary'
                          : eventInfo?.event?.extendedProps?.status ===
                            IN_PROGRESS
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
                  <Box display={'flex'} alignItems={'center'} gap={1} p={2}>
                    <TodoIcon />
                    <Typography variant="h5" color={'blue.main'}>
                      {eventInfo?.event?.extendedProps?.taskNo}
                    </Typography>
                    <Typography variant="body1" color={'blue.main'}>
                      {eventInfo?.event?.extendedProps?.data?.title}
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
                      setAddPlannedEffort({
                        open: true,
                        data: eventInfo?.event,
                      })
                    }
                  >
                    ADD PLANNED EFFORT
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() =>
                      router?.push({
                        pathname: AIR_SERVICES?.TICKETS_LIST,
                        query: {
                          ticketId:
                            eventInfo?.event?.extendedProps?.data?.ticketId,
                        },
                      })
                    }
                  >
                    VIEW TICKET
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
                <Typography
                  variant={'body2'}
                  color={'common.white'}
                  display={'flex'}
                  gap={0.3}
                >
                  {eventInfo?.event?.extendedProps?.taskNo}
                  {eventInfo?.event?.extendedProps?.data?.title}
                </Typography>
              </Box>
            </Tooltip>
          );
        }}
      />

      {onClickEvent?.open && (
        <UpdateWorkloadTask
          openDrawer={onClickEvent?.open}
          onClose={() => setOnClickEvent({ open: null, data: null })}
          data={onClickEvent?.data}
        />
      )}

      {addPlannedEffort?.open && (
        <UpdateWorkloadTask
          openDrawer={addPlannedEffort?.open}
          onClose={() => setAddPlannedEffort({ open: null, data: null })}
          data={addPlannedEffort?.data}
          edit
        />
      )}
    </Box>
  );
};
