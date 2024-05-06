import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { eventArray } from '../CalendarView.data';
import { Box, Tooltip, Typography } from '@mui/material';
import { CALENDER_TYPES } from '@/constants/strings';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditPenWhiteIcon } from '@/assets/icons';

export const FullCalendarView = (props: any) => {
  const {
    currentView,
    handleEventClick,
    handleDelete,
    theme,
    hoveredEvent,
    handleEventMouseEnter,
    handleEventMouseLeave,
  } = props;

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
            backgroundColor: 'primary.darker',
            cursor: 'pointer',
          },
        },
        '.fc-col-header-cell': {
          padding: '1rem',
          backgroundColor: 'primary.lighter',
        },
      }}
    >
      {currentView === CALENDER_TYPES?.DAY_VIEW_CALENDER && (
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView={CALENDER_TYPES?.DAY_VIEW_CALENDER}
          allDaySlot={false}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            timeZone: 'UTC',
          }}
          events={eventArray}
          eventClick={handleEventClick}
          eventContent={(eventInfo: any) => {
            const eventId = eventInfo?.event?._def?.defId;
            const isHovered = eventId === hoveredEvent;
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
                          {
                            eventInfo?.event?._def?.extendedProps?.data
                              ?.invitedBy
                          }
                        </Typography>
                      </Box>
                      {isHovered && (
                        <Box
                          display={'flex'}
                          alignItems={'center'}
                          sx={{ cursor: 'pointer' }}
                        >
                          <EditPenWhiteIcon
                            penColor={theme?.palette?.primary?.dark}
                          />
                          <DeleteIcon onClick={handleDelete} />
                        </Box>
                      )}
                    </Box>
                  </>
                }
              >
                <Typography variant="body2" align="center">
                  {eventInfo?.event?._def?.title}
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
          allDaySlot={false}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            timeZone: 'UTC',
          }}
          events={eventArray}
          eventClick={handleEventClick}
          eventContent={(eventInfo: any) => {
            const eventId = eventInfo?.event?._def?.defId;
            const isHovered = eventId === hoveredEvent;

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
                          {
                            eventInfo?.event?._def?.extendedProps?.data
                              ?.invitedBy
                          }
                        </Typography>
                      </Box>
                      {isHovered && (
                        <Box sx={{ cursor: 'pointer' }}>
                          <EditPenWhiteIcon
                            penColor={theme?.palette?.primary?.dark}
                          />
                          <DeleteIcon onClick={handleDelete} />
                        </Box>
                      )}
                    </Box>
                  </>
                }
              >
                <Typography variant="body2">
                  {eventInfo?.event?._def?.title}
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
          allDaySlot={false}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            timeZone: 'UTC',
          }}
          events={eventArray}
          eventContent={(eventInfo: any) => {
            const eventId = eventInfo?.event?._def?.defId;
            const isHovered = eventId === hoveredEvent;
            return (
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                width={'100%'}
                gap={'.5rem'}
                onMouseEnter={() => handleEventMouseEnter(eventId)}
                onMouseLeave={handleEventMouseLeave}
                ml={1}
                key={eventId}
              >
                <Box
                  onClick={() => handleEventClick(eventInfo)}
                  sx={{ cursor: 'pointer' }}
                  width={'100%'}
                >
                  <Typography>{eventInfo?.event?._def?.title}</Typography>
                  <Typography>
                    {eventInfo?.event?._def?.extendedProps?.data?.invitedBy}
                  </Typography>
                </Box>
                {isHovered && (
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    sx={{ cursor: 'pointer' }}
                  >
                    <EditPenWhiteIcon
                      penColor={theme?.palette?.primary?.lighter}
                    />
                    <DeleteIcon onClick={handleDelete} />
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
          allDaySlot={false}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            timeZone: 'UTC',
          }}
          events={eventArray}
          eventContent={(eventInfo: any) => {
            const eventId = eventInfo?.event?._def?.defId;
            const isHovered = eventId === hoveredEvent;
            return (
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                width={'100%'}
                gap={'.5rem'}
                onMouseEnter={() => handleEventMouseEnter(eventId)}
                onMouseLeave={handleEventMouseLeave}
                ml={1}
                key={eventId}
              >
                <Box
                  onClick={() => handleEventClick(eventInfo)}
                  sx={{ cursor: 'pointer' }}
                  width={'100%'}
                >
                  <Typography>{eventInfo?.event?._def?.title}</Typography>
                  <Typography>
                    {eventInfo?.event?._def?.extendedProps?.data?.invitedBy}
                  </Typography>
                </Box>
                {isHovered && (
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    sx={{ cursor: 'pointer' }}
                  >
                    <EditPenWhiteIcon
                      penColor={theme?.palette?.primary?.lighter}
                    />
                    <DeleteIcon onClick={handleDelete} />
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
