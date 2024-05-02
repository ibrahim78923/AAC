import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { eventArray } from '../CalendarView.data';
import { EventDialog } from '../EventDialog';
import styles from '../CalendarView.module.scss';
import { Box, Tooltip, Typography } from '@mui/material';
import { CALENDER_TYPES } from '@/constants/strings';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditPenWhiteIcon } from '@/assets/icons';
export const FullCalendarView = (props: any) => {
  const {
    currentView,
    openEventModal,
    setOpenEventModal,
    eventData,
    handleEventClick,
  } = props;

  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  const handleEventMouseEnter = (eventId: string) => {
    setHoveredEvent(eventId);
  };

  const handleEventMouseLeave = () => {
    setHoveredEvent(null);
  };

  return (
    <Box>
      {currentView === CALENDER_TYPES?.DAY_VIEW_CALENDER && (
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView={CALENDER_TYPES?.DAY_VIEW_CALENDER}
          allDaySlot={false}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: true,
          }}
          events={eventArray}
          eventClick={handleEventClick}
          eventClassNames={styles?.eventClassNames}
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
                sx={{ cursor: 'pointer' }}
                onMouseEnter={() => handleEventMouseEnter(eventId)}
                onMouseLeave={handleEventMouseLeave}
                ml={1}
                key={eventId}
              >
                <Box>
                  <Typography>{eventInfo?.event?._def?.title}</Typography>
                  <Typography>
                    {eventInfo?.event?._def?.extendedProps?.data?.invitedBy}
                  </Typography>
                </Box>
                {isHovered && (
                  <Box display={'flex'} alignItems={'center'}>
                    <EditPenWhiteIcon />
                    <DeleteIcon />
                  </Box>
                )}
              </Box>
            );
          }}
        />
      )}
      {currentView === CALENDER_TYPES?.WEEK_VIEW_CALENDER && (
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView={CALENDER_TYPES?.WEEK_VIEW_CALENDER}
          allDaySlot={false}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: true,
          }}
          events={eventArray}
          eventClick={handleEventClick}
          eventClassNames={styles?.eventClassNames}
          eventContent={(eventInfo: any) => {
            const eventId = eventInfo?.event?._def?.defId;
            const isHovered = eventId === hoveredEvent;
            return (
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: 'primary.darker',
                      boxShadow: 3,
                      maxWidth: 'unset',
                      borderRadius: 3,
                    },
                  },
                }}
                title={
                  <>
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                      width={'100%'}
                      gap={'.5rem'}
                      sx={{ cursor: 'pointer' }}
                      p={1}
                      onMouseEnter={() => handleEventMouseEnter(eventId)}
                      onMouseLeave={handleEventMouseLeave}
                      key={eventId}
                    >
                      <Box display={'flex'} alignItems={'center'} gap={1}>
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
                        <Box display={'flex'} alignItems={'center'}>
                          <EditPenWhiteIcon />
                          <DeleteIcon />
                        </Box>
                      )}
                    </Box>
                  </>
                }
              >
                <Box
                  sx={{
                    borderRadius: '.2rem',
                    border: 'none',
                    borderLeft: '.5rem solid #278d7f',
                    backgroundColor: '#38cab5 !important',
                    color: '#f6faf9',
                    fontSize: '.7rem',
                    height: '100%',
                  }}
                >
                  <Typography variant="body2">
                    {eventInfo?.event?._def?.title}
                  </Typography>
                </Box>
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
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: true,
          }}
          events={eventArray}
          eventClick={handleEventClick}
          eventClassNames={styles?.eventClassNames}
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
                sx={{ cursor: 'pointer' }}
                onMouseEnter={() => handleEventMouseEnter(eventId)}
                onMouseLeave={handleEventMouseLeave}
                ml={1}
                key={eventId}
              >
                <Box>
                  <Typography>{eventInfo?.event?._def?.title}</Typography>
                  <Typography>
                    {eventInfo?.event?._def?.extendedProps?.data?.invitedBy}
                  </Typography>
                </Box>
                {isHovered && (
                  <Box display={'flex'} alignItems={'center'}>
                    <EditPenWhiteIcon />
                    <DeleteIcon />
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
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: true,
          }}
          events={eventArray}
          eventClick={handleEventClick}
          eventClassNames={styles?.eventClassNames}
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
                sx={{ cursor: 'pointer' }}
                onMouseEnter={() => handleEventMouseEnter(eventId)}
                onMouseLeave={handleEventMouseLeave}
                ml={1}
                key={eventId}
              >
                <Box>
                  <Typography>{eventInfo?.event?._def?.title}</Typography>
                  <Typography>
                    {eventInfo?.event?._def?.extendedProps?.data?.invitedBy}
                  </Typography>
                </Box>
                {isHovered && (
                  <Box display={'flex'} alignItems={'center'}>
                    <EditPenWhiteIcon />
                    <DeleteIcon />
                  </Box>
                )}
              </Box>
            );
          }}
        />
      )}
      {openEventModal && (
        <EventDialog
          openEventModal={openEventModal}
          setOpenEventModal={setOpenEventModal}
          eventData={eventData}
        />
      )}
    </Box>
  );
};
