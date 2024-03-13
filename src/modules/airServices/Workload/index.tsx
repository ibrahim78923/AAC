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
import styles from './Workload.module.scss';
import CircleIcon from '@mui/icons-material/Circle';
import { TodoIcon } from '@/assets/icons';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { UpdateWorkloadTask } from './UpdateWorkloadTask';
import { AIR_SERVICES, DATE_TIME_FORMAT } from '@/constants';
import useWorkload from './useWorkload';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_WORKLOAD_CALENDER_VIEW_PERMISSIONS } from '@/constants/permission-keys';

export const Workload = () => {
  const {
    status,
    statusFilter,
    filterIndex,
    dateChangeHandler,
    dateCalendar,
    selected,
    setSelected,
    setFilter,
    calendarRef,
    COMPLETED,
    IN_PROGRESS,
    setAddPlannedEffort,
    router,
    setOnClickEvent,
    onClickEvent,
    addPlannedEffort,
  } = useWorkload();

  if (status?.isError || statusFilter?.isError) return <ApiErrorState />;

  if (
    status?.isLoading ||
    status?.isFetching ||
    statusFilter?.isLoading ||
    statusFilter?.isFetching
  )
    return <SkeletonTable />;

  return (
    <Box className={styles?.calendarWrapper}>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_WORKLOAD_CALENDER_VIEW_PERMISSIONS?.VIEW_WORKLOAD,
        ]}
      >
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
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_WORKLOAD_CALENDER_VIEW_PERMISSIONS?.MANAGE_WORKLOAD,
              ]}
            >
              <ManageWorkload />
            </PermissionsGuard>

            <PermissionsGuard
              permissions={[
                AIR_SERVICES_WORKLOAD_CALENDER_VIEW_PERMISSIONS?.UNASSIGNED_WORKLOAD,
              ]}
            >
              <UnassignedWork />
            </PermissionsGuard>

            <PermissionsGuard
              permissions={[
                AIR_SERVICES_WORKLOAD_CALENDER_VIEW_PERMISSIONS?.FILTERS,
              ]}
            >
              <Filters setFilter={setFilter} />
            </PermissionsGuard>
          </Grid>
        </Grid>

        <FullCalendar
          ref={calendarRef}
          dayHeaderContent={(data: any) => {
            const count = statusFilter?.data?.data?.filter(
              (item: any) =>
                item?.day === +dayjs(data?.date)?.format(DATE_TIME_FORMAT?.D),
            );
            const countHours = statusFilter?.data?.data?.filter(
              (item: any) =>
                dayjs(item?.date)?.format(DATE_TIME_FORMAT?.D) ===
                dayjs(data?.date)?.format(DATE_TIME_FORMAT?.D),
            );
            const hours = Math.floor(
              countHours?.[filterIndex]?.totalPlannedEffort / 60,
            );
            const minutes = countHours?.[filterIndex]?.totalPlannedEffort % 60;
            const countHoursPercent = statusFilter?.data?.data?.filter(
              (item: any) =>
                dayjs(item?.date)?.format(DATE_TIME_FORMAT?.D) ===
                dayjs(data?.date)?.format(DATE_TIME_FORMAT?.D),
            );
            return (
              <Box sx={{ cursor: 'pointer' }}>
                {dayjs(data?.date)?.format(DATE_TIME_FORMAT?.DDDDDD)}
                <Typography variant={'h6'}>
                  {count?.[filterIndex]?.count ?? null}
                  {countHours?.[filterIndex]?.totalPlannedEffort
                    ? `${hours}hr ${minutes}m`
                    : null}
                  {countHoursPercent?.[filterIndex]?.averagePlannedEffort
                    ? `${countHoursPercent?.[filterIndex]?.averagePlannedEffort}%`
                    : null}
                </Typography>
              </Box>
            );
          }}
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
                  <>
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
                        DATE_TIME_FORMAT?.DDMMYYYY,
                      )}{' '}
                      -{' '}
                      {dayjs(eventInfo?.event?.end)?.format(
                        DATE_TIME_FORMAT?.DDMMYYYY,
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
                  </>
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
                    {eventInfo?.event?.extendedProps?.taskNo}{' '}
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
      </PermissionsGuard>
    </Box>
  );
};
