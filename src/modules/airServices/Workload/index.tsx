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
import { DateFilter } from './DateFilter';
import { ManageWorkload } from './ManageWorkload';
import { UnassignedWork } from './UnassignedWork';
import { Filters } from './Filters';
import { Profile } from './Profile';
import styles from './Workload.module.scss';
import CircleIcon from '@mui/icons-material/Circle';
import { TodoIcon } from '@/assets/icons';
import ApiErrorState from '@/components/ApiErrorState';
import { UpdateWorkloadTask } from './UpdateWorkloadTask';
import { DATE_TIME_FORMAT } from '@/constants';
import { AIR_SERVICES } from '@/constants/routes';
import useWorkload from './useWorkload';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_WORKLOAD_CALENDER_VIEW_PERMISSIONS } from '@/constants/permission-keys';
import ViewWorkloadDrawer from './ViewWorkloadDrawer';
import { ARRAY_INDEX } from '@/constants/strings';
import { WORKLOAD_STATUSES_OBJECT } from './Workload.data';
import { fullNameInitial, generateImage } from '@/utils/avatarUtils';
import { UpdateWorkloadTicket } from './UpdateWorkloadTicket';
import { SkeletonWorkload } from './SkeletonWorkload';
import { otherDateFormat } from '@/lib/date-time';

export const Workload = () => {
  const {
    status,
    statusFilter,
    dateChangeHandler,
    dateCalendar,
    selected,
    setSelected,
    setFilter,
    calendarRef,
    setAddPlannedEffort,
    router,
    setOnClickEvent,
    onClickEvent,
    addPlannedEffort,
    setAddPlannedTicketEffort,
    addPlannedTicketEffort,
    methods,
    setFilterByTypeState,
    firstTrigger,
  } = useWorkload();

  if (status?.isError || statusFilter?.isError)
    return (
      <>
        <Typography variant={'h3'} mb={3}>
          Workload
        </Typography>
        <ApiErrorState canRefresh refresh={firstTrigger} />
      </>
    );

  if (
    status?.isLoading ||
    status?.isFetching ||
    statusFilter?.isLoading ||
    statusFilter?.isFetching
  )
    return (
      <Box display={'flex'} flexDirection={'column'} gap={3}>
        <Typography variant={'h3'}>Workload</Typography>
        <SkeletonWorkload />
      </Box>
    );

  return (
    <Box className={styles?.calendarWrapper}>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_WORKLOAD_CALENDER_VIEW_PERMISSIONS?.VIEW_WORKLOAD,
        ]}
      >
        <Typography variant={'h3'} mb={3}>
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
              <Filters
                setFilter={setFilter}
                methods={methods}
                setFilterByTypeState={setFilterByTypeState}
              />
            </PermissionsGuard>
          </Grid>
        </Grid>

        <FullCalendar
          ref={calendarRef}
          dayHeaderContent={(data: any) => {
            const count = statusFilter?.data?.data?.filter(
              (item: any) =>
                item?.day === +otherDateFormat(data?.date, DATE_TIME_FORMAT?.D),
            );
            const countHours = statusFilter?.data?.data?.filter(
              (item: any) =>
                otherDateFormat(item?.date, DATE_TIME_FORMAT?.D) ===
                otherDateFormat(data?.date, DATE_TIME_FORMAT?.D),
            );
            const hours = Math.floor(
              countHours?.[ARRAY_INDEX?.ZERO]?.totalPlannedEffort / 60,
            );
            const minutes =
              countHours?.[ARRAY_INDEX?.ZERO]?.totalPlannedEffort % 60;
            const countHoursPercent = statusFilter?.data?.data?.filter(
              (item: any) =>
                otherDateFormat(item?.date, DATE_TIME_FORMAT?.D) ===
                otherDateFormat(data?.date, DATE_TIME_FORMAT?.D),
            );
            return (
              <Box sx={{ cursor: 'pointer' }}>
                {otherDateFormat(data?.date, DATE_TIME_FORMAT?.DDDDDD)}
                <Typography variant={'h6'}>
                  {count?.[ARRAY_INDEX?.ZERO]?.count ?? null}
                  {countHours?.[ARRAY_INDEX?.ZERO]?.totalPlannedEffort
                    ? `${hours}hr ${minutes}m`
                    : null}
                  {countHoursPercent?.[ARRAY_INDEX?.ZERO]?.workloadPercentage
                    ? `${countHoursPercent?.[
                        ARRAY_INDEX?.ZERO
                      ]?.workloadPercentage?.toFixed(0)}%`
                    : null}
                </Typography>
              </Box>
            );
          }}
          headerToolbar={false}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView={'dayGridWeek'}
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
                  <Box p={2}>
                    <Box display={'flex'} alignItems={'center'} gap={1} pb={2}>
                      <CircleIcon
                        fontSize={'small'}
                        color={
                          eventInfo?.event?.extendedProps?.status ===
                            WORKLOAD_STATUSES_OBJECT?.COMPLETED ||
                          eventInfo?.event?.extendedProps?.status ===
                            WORKLOAD_STATUSES_OBJECT?.RESOLVED ||
                          eventInfo?.event?.extendedProps?.status ===
                            WORKLOAD_STATUSES_OBJECT?.CLOSED
                            ? 'primary'
                            : eventInfo?.event?.extendedProps?.status ===
                                  WORKLOAD_STATUSES_OBJECT?.IN_PROGRESS ||
                                eventInfo?.event?.extendedProps?.status ===
                                  WORKLOAD_STATUSES_OBJECT?.PENDING
                              ? 'warning'
                              : 'secondary'
                        }
                      />
                      <Typography
                        variant={'body1'}
                        color={'blue.main'}
                        textTransform={'capitalize'}
                      >
                        {eventInfo?.event?.extendedProps?.status?.toLowerCase()}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box display={'flex'} alignItems={'center'} gap={1} py={2}>
                      <TodoIcon />
                      <Typography
                        variant={'h5'}
                        color={'blue.main'}
                        textTransform={'uppercase'}
                      >
                        {eventInfo?.event?.extendedProps?.ticketIdNumber ||
                          eventInfo?.event?.extendedProps?.taskId}
                      </Typography>
                      <Typography
                        variant={'body1'}
                        color={'blue.main'}
                        textTransform={'capitalize'}
                      >
                        {eventInfo?.event?.extendedProps?.title ||
                          eventInfo?.event?.extendedProps?.subject}
                      </Typography>
                    </Box>
                    <Typography
                      variant={'body2'}
                      px={2}
                      ml={2}
                      color={'custom.main'}
                      pb={2}
                    >
                      {eventInfo?.event?.start
                        ? otherDateFormat(
                            eventInfo?.event?.start,
                            DATE_TIME_FORMAT?.FORMAT_24_HOUR,
                          )
                        : 'No Date'}{' '}
                      -{' '}
                      {eventInfo?.event?.end
                        ? otherDateFormat(
                            eventInfo?.event?.end,
                            DATE_TIME_FORMAT?.FORMAT_24_HOUR,
                          )
                        : 'No Date'}
                    </Typography>
                    <Divider />
                    {eventInfo?.event?.extendedProps?.taskId && (
                      <Button
                        color={'secondary'}
                        onClick={() =>
                          setAddPlannedEffort({
                            open: true,
                            data: eventInfo?.event,
                          })
                        }
                      >
                        ADD PLANNED EFFORT
                      </Button>
                    )}
                    {eventInfo?.event?.extendedProps?.ticketIdParent && (
                      <Button
                        color={'secondary'}
                        onClick={() =>
                          setAddPlannedTicketEffort({
                            open: true,
                            data: eventInfo?.event,
                          })
                        }
                      >
                        ADD PLANNED EFFORT
                      </Button>
                    )}
                    <Button
                      color={'secondary'}
                      onClick={() =>
                        router?.push({
                          pathname: AIR_SERVICES?.TICKETS_LIST,
                          query: {
                            ticketId: eventInfo?.event?.extendedProps
                              ?.ticketIdParent
                              ? eventInfo?.event?.extendedProps?.ticketIdParent
                              : eventInfo?.event?.extendedProps?.ticketId,
                          },
                        })
                      }
                    >
                      VIEW TICKET
                    </Button>
                  </Box>
                }
              >
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  gap={1}
                  sx={{ cursor: 'pointer' }}
                  overflow={'hidden'}
                  onClick={() =>
                    eventInfo?.event?.extendedProps?.taskId
                      ? setOnClickEvent({
                          open: true,
                          data: eventInfo?.event,
                        })
                      : router?.push({
                          pathname: AIR_SERVICES?.TICKETS_LIST,
                          query: {
                            ticketId:
                              eventInfo?.event?.extendedProps?.ticketIdParent,
                          },
                        })
                  }
                >
                  {eventInfo?.event?.extendedProps?.ticketIdParent ? (
                    <Avatar
                      src={generateImage(
                        eventInfo?.event?.extendedProps?.avatar?.url,
                      )}
                      sx={{
                        width: 28,
                        height: 28,
                        color: 'primary.main',
                        fontSize: '12px',
                      }}
                    >
                      {fullNameInitial(
                        eventInfo?.event?.extendedProps?.agentDetails
                          ?.firstName,
                        eventInfo?.event?.extendedProps?.agentDetails?.lastName,
                      )}
                    </Avatar>
                  ) : (
                    <Avatar
                      src={generateImage(
                        eventInfo?.event?.extendedProps?.assignedUser?.avatar
                          ?.url,
                      )}
                      sx={{
                        width: 28,
                        height: 28,
                        color: 'primary.main',
                        fontSize: '12px',
                      }}
                    >
                      {fullNameInitial(
                        eventInfo?.event?.extendedProps?.assignedUser
                          ?.firstName,
                        eventInfo?.event?.extendedProps?.assignedUser?.lastName,
                      )}
                    </Avatar>
                  )}

                  <Typography
                    variant={'body2'}
                    color={'common.white'}
                    display={'flex'}
                    textTransform={'uppercase'}
                  >
                    {eventInfo?.event?.extendedProps?.ticketIdNumber ||
                      eventInfo?.event?.extendedProps?.taskId}
                  </Typography>
                  <Typography
                    variant={'body2'}
                    color={'common.white'}
                    display={'flex'}
                    textTransform={'capitalize'}
                  >
                    {eventInfo?.event?.extendedProps?.title ||
                      eventInfo?.event?.extendedProps?.subject}
                  </Typography>
                </Box>
              </Tooltip>
            );
          }}
        />

        {onClickEvent?.open && (
          <ViewWorkloadDrawer
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
          />
        )}

        {addPlannedTicketEffort?.open && (
          <UpdateWorkloadTicket
            openDrawer={addPlannedTicketEffort?.open}
            onClose={() =>
              setAddPlannedTicketEffort({ open: null, data: null })
            }
            data={addPlannedTicketEffort?.data}
          />
        )}
      </PermissionsGuard>
    </Box>
  );
};
