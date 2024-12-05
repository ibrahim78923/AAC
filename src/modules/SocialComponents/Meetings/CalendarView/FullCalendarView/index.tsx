import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { CALENDER_TYPES } from '@/constants/strings';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditPenCustomIcon } from '@/assets/icons';
import { truncateText } from '@/utils/avatarUtils';
import { SOCIAL_COMPONENTS } from '@/constants';
import { useRouter } from 'next/router';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

export const FullCalendarView = (props: any) => {
  const {
    currentView,
    handleEventClick,
    handleDelete,
    theme,
    hoveredEvent,
    handleEventMouseEnter,
    handleEventMouseLeave,
    status,
    meetingActiveType,
  } = props;
  const router = useRouter();
  const statusData = status?.data?.data;

  if (status?.isLoading || status?.isFetching) return <SkeletonForm />;
  return (
    <Box
      sx={{
        '.fc-event': {
          backgroundColor: 'primary.main',
          border: 'none',
          borderRadius: '.2rem',
          borderLeft: `.5rem solid ${theme?.palette?.primary?.dark}`,
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark',
            cursor: 'pointer',
          },
        },
        '.fc-col-header-cell': {
          padding: '1rem',
          backgroundColor: theme?.palette?.grey[700],
        },
        '.fc-timegrid-slot': {
          padding: '.25rem',
        },
        '.fc-timegrid-slot-minor': {
          borderTop: 'none',
        },
      }}
    >
      {currentView === CALENDER_TYPES?.DAY_VIEW_CALENDER && (
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView={CALENDER_TYPES?.DAY_VIEW_CALENDER}
          views={{
            timeGrid: {
              allDaySlot: false,
            },
          }}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
          }}
          events={statusData}
          eventClick={handleEventClick}
          eventContent={(eventInfo: any) => {
            const eventId = eventInfo?.event?._def?.extendedProps?._id;
            const isHovered = eventId === hoveredEvent;
            const findData = eventInfo?.event?._def?.extendedProps;

            return (
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: 'primary.light',
                      boxShadow: 2,
                      maxWidth: 'unset',
                      borderRadius: 3,
                      color: 'primary.dark',
                    },
                  },
                }}
                title={
                  <>
                    <Box
                      display={'flex'}
                      width={'100%'}
                      gap={'1rem'}
                      p={1}
                      onMouseEnter={() => handleEventMouseEnter(eventId)}
                      onMouseLeave={handleEventMouseLeave}
                      key={eventId}
                    >
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        gap={1}
                        onClick={() => handleEventClick(eventInfo)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <Typography variant="body2">
                          {eventInfo?.event?._def?.title}
                        </Typography>
                        <Typography variant="body2">
                          {eventInfo?.event?._def?.extendedProps?.userName}
                        </Typography>
                      </Box>
                      {isHovered && (
                        <Box
                          display={'flex'}
                          alignItems={'center'}
                          sx={{ cursor: 'pointer' }}
                        >
                          <IconButton
                            onClick={() =>
                              router?.push({
                                pathname: SOCIAL_COMPONENTS?.UPSERT_MEETING,
                                query: {
                                  type: meetingActiveType(
                                    eventInfo?.event?._def?.extendedProps?.type,
                                  ),
                                  id: eventId,
                                },
                              })
                            }
                          >
                            <EditPenCustomIcon
                              penColor={theme?.palette?.primary?.dark}
                            />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(findData)}>
                            <DeleteIcon
                              sx={{ color: theme?.palette?.primary?.dark }}
                            />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                  </>
                }
              >
                <Typography variant="body2" align="center" height={'100%'}>
                  {truncateText(eventInfo?.event?._def?.title)}
                </Typography>
              </Tooltip>
            );
          }}
        />
      )}
      {currentView === CALENDER_TYPES?.WEEK_VIEW_CALENDER && (
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView={CALENDER_TYPES?.WEEK_VIEW_CALENDER}
          views={{
            timeGrid: {
              allDaySlot: false,
            },
          }}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
          }}
          events={statusData}
          eventClick={handleEventClick}
          eventContent={(eventInfo: any) => {
            const eventId = eventInfo?.event?._def?.extendedProps?._id;
            const isHovered = eventId === hoveredEvent;
            const findData = eventInfo?.event?._def?.extendedProps;

            return (
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: 'primary.light',
                      boxShadow: 2,
                      maxWidth: 'unset',
                      borderRadius: 3,
                      color: 'primary.dark',
                    },
                  },
                }}
                title={
                  <>
                    <Box
                      display={'flex'}
                      width={'100%'}
                      gap={'1rem'}
                      p={1}
                      onMouseEnter={() => handleEventMouseEnter(eventId)}
                      onMouseLeave={handleEventMouseLeave}
                      key={eventId}
                    >
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        gap={1}
                        onClick={() => handleEventClick(eventInfo)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <Typography variant="body2">
                          {eventInfo?.event?._def?.title}
                        </Typography>
                        <Typography variant="body2">
                          {eventInfo?.event?._def?.extendedProps?.userName}
                        </Typography>
                      </Box>
                      {isHovered && (
                        <Box
                          display={'flex'}
                          alignItems={'center'}
                          sx={{ cursor: 'pointer' }}
                        >
                          <IconButton
                            onClick={() =>
                              router?.push({
                                pathname: SOCIAL_COMPONENTS?.UPSERT_MEETING,
                                query: {
                                  type: meetingActiveType(
                                    eventInfo?.event?._def?.extendedProps?.type,
                                  ),
                                  id: eventId,
                                },
                              })
                            }
                          >
                            <EditPenCustomIcon
                              penColor={theme?.palette?.primary?.dark}
                            />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(findData)}>
                            <DeleteIcon
                              sx={{ color: theme?.palette?.primary?.dark }}
                            />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                  </>
                }
              >
                <Typography variant="body2" height={'100%'}>
                  {truncateText(eventInfo?.event?._def?.title)}
                </Typography>
              </Tooltip>
            );
          }}
        />
      )}
      {currentView === CALENDER_TYPES?.MONTH_VIEW_CALENDER && (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView={CALENDER_TYPES?.MONTH_VIEW_CALENDER}
          dayMaxEventRows={true}
          views={{
            timeGrid: {
              allDaySlot: false,
            },
          }}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
          }}
          events={statusData}
          eventContent={(eventInfo: any) => {
            const eventId = eventInfo?.event?._def?.extendedProps?._id;
            const isHovered = eventId === hoveredEvent;
            const { startTime, endTime } =
              eventInfo?.event?._def?.extendedProps;
            const findData = eventInfo?.event?._def?.extendedProps;

            return (
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                width={'100%'}
                onMouseEnter={() => handleEventMouseEnter(eventId)}
                onMouseLeave={handleEventMouseLeave}
                ml={0.2}
                key={eventId}
              >
                <Box
                  position="relative"
                  display={'flex'}
                  onClick={() => handleEventClick(eventInfo)}
                  sx={{ cursor: 'pointer' }}
                  gap={0.3}
                  width={'100%'}
                >
                  <Box>
                    <Typography variant="body4">{startTime}</Typography>
                    <br />
                    <Typography variant="body4">{endTime}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body4">
                      {truncateText(eventInfo?.event?._def?.title, 10)}
                    </Typography>
                    <br />
                    <Typography variant="body4">
                      {truncateText(
                        eventInfo?.event?._def?.extendedProps?.userName,
                        10,
                      )}
                    </Typography>
                  </Box>
                </Box>
                {isHovered && (
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      onClick={() =>
                        router?.push({
                          pathname: SOCIAL_COMPONENTS?.UPSERT_MEETING,
                          query: {
                            type: meetingActiveType(
                              eventInfo?.event?._def?.extendedProps?.type,
                            ),
                            id: eventId,
                          },
                        })
                      }
                    >
                      <EditPenCustomIcon
                        penColor={theme?.palette?.primary?.lighter}
                      />
                    </Box>
                    <Box display={'flex'} alignItems={'center'}>
                      <DeleteIcon onClick={() => handleDelete(findData)} />
                    </Box>
                  </Box>
                )}
              </Box>
            );
          }}
        />
      )}
      {currentView === CALENDER_TYPES?.YEAR_VIEW_CALENDER && (
        <FullCalendar
          plugins={[multiMonthPlugin]}
          initialView={CALENDER_TYPES?.YEAR_VIEW_CALENDER}
          dayMaxEventRows={true}
          views={{
            timeGrid: {
              allDaySlot: false,
            },
          }}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
          }}
          events={statusData}
          eventContent={(eventInfo: any) => {
            const eventId = eventInfo?.event?._def?.extendedProps?._id;
            const isHovered = eventId === hoveredEvent;
            const { startTime, endTime } =
              eventInfo?.event?._def?.extendedProps;
            const findData = eventInfo?.event?._def?.extendedProps;

            return (
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                width={'100%'}
                gap={'.5rem'}
                onMouseEnter={() => handleEventMouseEnter(eventId)}
                onMouseLeave={handleEventMouseLeave}
                ml={0.2}
                key={eventId}
              >
                <Box
                  position="relative"
                  display={'flex'}
                  onClick={() => handleEventClick(eventInfo)}
                  sx={{ cursor: 'pointer' }}
                  gap={0.4}
                  width={'100%'}
                >
                  <Box>
                    <Typography variant="body4">{startTime}</Typography>
                    <br />
                    <Typography variant="body4">{endTime}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body4">
                      {truncateText(eventInfo?.event?._def?.title, 10)}
                    </Typography>
                    <br />
                    <Typography variant="body4">
                      {truncateText(
                        eventInfo?.event?._def?.extendedProps?.userName,
                        10,
                      )}
                    </Typography>
                  </Box>
                </Box>
                {isHovered && (
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      onClick={() =>
                        router?.push({
                          pathname: SOCIAL_COMPONENTS?.UPSERT_MEETING,
                          query: {
                            type: meetingActiveType(
                              eventInfo?.event?._def?.extendedProps?.type,
                            ),
                            id: eventId,
                          },
                        })
                      }
                    >
                      <EditPenCustomIcon
                        penColor={theme?.palette?.primary?.lighter}
                      />
                    </Box>
                    <Box display={'flex'} alignItems={'center'}>
                      <DeleteIcon onClick={() => handleDelete(findData)} />
                    </Box>
                  </Box>
                )}
              </Box>
            );
          }}
        />
      )}
    </Box>
  );
};
