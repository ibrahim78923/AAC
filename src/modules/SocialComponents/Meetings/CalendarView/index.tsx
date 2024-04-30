import { Box, Button, Grid } from '@mui/material';
import Search from '@/components/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { FullCalendarView } from './FullCalendarView';
import { useCalendarView } from './useCalendarView';
import { MeetingCard } from './MeetingCard';
import styles from './CalendarView.module.scss';
import ReorderIcon from '@mui/icons-material/Reorder';
import { SOCIAL_COMPONENTS } from '@/constants';
import { Header } from './Header';

export const CalendarView = () => {
  const {
    handleViewChange,
    currentView,
    setSearch,
    meetingCard,
    openEventModal,
    setOpenEventModal,
    eventData,
    handleEventClick,
    router,
  } = useCalendarView();

  return (
    <Box className={styles?.calendarWrapper}>
      <Header />
      <Grid container spacing={1}>
        {meetingCard?.map((item: any) => (
          <Grid item xs={12} md={6} lg={4} key={item?.id}>
            <MeetingCard
              heading={item?.heading}
              meetingsCount={item?.meetingsCount}
              color={item?.color}
            />
          </Grid>
        ))}
      </Grid>
      <br />
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Search label="Search Here" setSearchBy={setSearch} />
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={1}
        >
          <Button
            variant={currentView === 'timeGridDay' ? 'contained' : 'outlined'}
            startIcon={<CalendarTodayIcon />}
            color="secondary"
            onClick={() => handleViewChange('timeGridDay')}
            sx={{
              backgroundColor:
                currentView === 'timeGridDay' ? 'primary.main' : undefined,
            }}
          >
            Today
          </Button>
          <Button
            variant={currentView === 'timeGridWeek' ? 'contained' : 'outlined'}
            startIcon={<DateRangeIcon />}
            color="secondary"
            onClick={() => handleViewChange('timeGridWeek')}
            sx={{
              backgroundColor:
                currentView === 'timeGridWeek' ? 'primary.main' : undefined,
            }}
          >
            Weekly
          </Button>
          <Button
            variant={currentView === 'dayGridMonth' ? 'contained' : 'outlined'}
            startIcon={<CalendarMonthIcon />}
            color="secondary"
            onClick={() => handleViewChange('dayGridMonth')}
            sx={{
              backgroundColor:
                currentView === 'dayGridMonth' ? 'primary.main' : undefined,
            }}
          >
            Monthly
          </Button>
          <Button
            variant={
              currentView === 'multiMonthYear' ? 'contained' : 'outlined'
            }
            startIcon={<EventAvailableIcon />}
            color="secondary"
            onClick={() => handleViewChange('multiMonthYear')}
            sx={{
              backgroundColor:
                currentView === 'multiMonthYear' ? 'primary.main' : undefined,
            }}
          >
            yearly
          </Button>
          <Button
            startIcon={<ReorderIcon sx={{ ml: 1 }} />}
            color="secondary"
            variant="outlined"
            onClick={() => router?.push(SOCIAL_COMPONENTS?.MEETINGS)}
          />
        </Box>
      </Box>
      <br />
      <br />
      <FullCalendarView
        currentView={currentView}
        openEventModal={openEventModal}
        handleEventClick={handleEventClick}
        eventData={eventData}
        setOpenEventModal={setOpenEventModal}
      />
    </Box>
  );
};
