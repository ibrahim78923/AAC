import { Box, Button, Grid } from '@mui/material';
import Search from '@/components/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { FullCalendarView } from './FullCalendarView';
import { useCalendarView } from './useCalendarView';
import { MeetingCard } from './MeetingCard';
import ReorderIcon from '@mui/icons-material/Reorder';
import { SOCIAL_COMPONENTS } from '@/constants';
import { Header } from './Header';
import {
  ALERT_MODALS_TYPE,
  CALENDER_TYPES,
  MEETINGS_DETAILS_TYPE,
} from '@/constants/strings';
import { AlertModals } from '@/components/AlertModals';
import { EventDialog } from './EventDialog';

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
    setOpenDeleteModal,
    openDeleteModal,
    handleDelete,
    theme,
    hoveredEvent,
    handleEventMouseEnter,
    handleEventMouseLeave,
    handleDeleteSubmit,
  } = useCalendarView();

  return (
    <>
      <Header />
      <Grid container spacing={2}>
        {meetingCard?.map((item: any) => (
          <Grid item xs={12} sm={6} lg={4} key={item?.id}>
            <MeetingCard
              heading={item?.heading}
              meetingsCount={item?.meetingsCount}
              color={item?.color}
              router={router}
            />
          </Grid>
        ))}
      </Grid>
      <Box
        p={2}
        border={`.1rem solid ${theme?.palette?.grey[0]}`}
        borderRadius={3}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={'4rem'}
        >
          <Search label="Search Here" setSearchBy={setSearch} />
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={1}
          >
            <Button
              variant={
                currentView === CALENDER_TYPES?.DAY_VIEW_CALENDER
                  ? 'contained'
                  : 'outlined'
              }
              startIcon={<CalendarTodayIcon />}
              color="secondary"
              onClick={() =>
                handleViewChange(CALENDER_TYPES?.DAY_VIEW_CALENDER)
              }
              sx={{
                backgroundColor:
                  currentView === CALENDER_TYPES?.DAY_VIEW_CALENDER
                    ? 'primary.main'
                    : undefined,
              }}
            >
              Today
            </Button>
            <Button
              variant={
                currentView === CALENDER_TYPES?.WEEK_VIEW_CALENDER
                  ? 'contained'
                  : 'outlined'
              }
              startIcon={<DateRangeIcon />}
              color="secondary"
              onClick={() =>
                handleViewChange(CALENDER_TYPES?.WEEK_VIEW_CALENDER)
              }
              sx={{
                backgroundColor:
                  currentView === CALENDER_TYPES?.WEEK_VIEW_CALENDER
                    ? 'primary.main'
                    : undefined,
              }}
            >
              Weekly
            </Button>
            <Button
              variant={
                currentView === CALENDER_TYPES?.MONTH_VIEW_CALENDER
                  ? 'contained'
                  : 'outlined'
              }
              startIcon={<CalendarMonthIcon />}
              color="secondary"
              onClick={() =>
                handleViewChange(CALENDER_TYPES?.MONTH_VIEW_CALENDER)
              }
              sx={{
                backgroundColor:
                  currentView === CALENDER_TYPES?.MONTH_VIEW_CALENDER
                    ? 'primary.main'
                    : undefined,
              }}
            >
              Monthly
            </Button>
            <Button
              variant={
                currentView === CALENDER_TYPES?.YEAR_VIEW_CALENDER
                  ? 'contained'
                  : 'outlined'
              }
              startIcon={<EventAvailableIcon />}
              color="secondary"
              onClick={() =>
                handleViewChange(CALENDER_TYPES?.YEAR_VIEW_CALENDER)
              }
              sx={{
                backgroundColor:
                  currentView === CALENDER_TYPES?.YEAR_VIEW_CALENDER
                    ? 'primary.main'
                    : undefined,
              }}
            >
              yearly
            </Button>
            <Button
              startIcon={<ReorderIcon sx={{ ml: 1 }} />}
              color="secondary"
              variant="outlined"
              onClick={() =>
                router?.push({
                  pathname: SOCIAL_COMPONENTS?.MEETINGS,
                  query: {
                    type: MEETINGS_DETAILS_TYPE?.ALL,
                  },
                })
              }
            />
          </Box>
        </Box>
        <FullCalendarView
          currentView={currentView}
          openEventModal={openEventModal}
          handleEventClick={handleEventClick}
          eventData={eventData}
          setOpenEventModal={setOpenEventModal}
          handleDelete={handleDelete}
          theme={theme}
          handleEventMouseLeave={handleEventMouseLeave}
          handleEventMouseEnter={handleEventMouseEnter}
          hoveredEvent={hoveredEvent}
        />
      </Box>
      {openDeleteModal && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={openDeleteModal}
          handleClose={() => setOpenDeleteModal(false)}
          handleSubmitBtn={handleDeleteSubmit}
          message="Are you sure want to delete this record?"
        />
      )}
      {openEventModal && (
        <EventDialog
          openEventModal={openEventModal}
          setOpenEventModal={setOpenEventModal}
          eventData={eventData}
          theme={theme}
        />
      )}
    </>
  );
};
