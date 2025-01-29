import { Box, Button } from '@mui/material';
import Search from '@/components/Search';
import { FullCalendarView } from './FullCalendarView';
import { useCalendarView } from './useCalendarView';
import { MeetingCard } from './MeetingCard';
import ReorderIcon from '@mui/icons-material/Reorder';
import { SOCIAL_COMPONENTS } from '@/constants';
import { Header } from './Header';
import { ALERT_MODALS_TYPE, MEETINGS_DETAILS_TYPE } from '@/constants/strings';
import { AlertModals } from '@/components/AlertModals';
import { EventDialog } from './EventDialog';
import { calendarButtons } from './CalendarView.data';
import { CalendarButtonI } from './CalenderView.interface';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

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
    status,
    meetingActiveType,
    deleteMeetingsStatus,
  } = useCalendarView();

  return (
    <>
      <Header />
      <ContainerGrid>
        {meetingCard?.map((item: any) => (
          <CustomGrid sm={6} lg={4} key={item?.id}>
            <MeetingCard
              heading={item?.heading}
              meetingsCount={item?.meetingsCount}
              color={item?.color}
              router={router}
              type={item?.type}
            />
          </CustomGrid>
        ))}
      </ContainerGrid>
      <Box
        p={2}
        border={`.1rem solid ${theme?.palette?.custom?.dark}`}
        borderRadius={3}
      >
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={'4rem'}
          gap={1}
        >
          <Search label="Search Here" setSearchBy={setSearch} />
          <Box display={'flex'} flexWrap={'wrap'} gap={1}>
            {calendarButtons?.map((data: CalendarButtonI) => (
              <Box key={data?.id}>
                <Button
                  variant={
                    currentView === data?.type ? 'contained' : 'outlined'
                  }
                  startIcon={data?.icon}
                  onClick={() => handleViewChange(data?.type)}
                  color={currentView === data?.type ? 'primary' : 'secondary'}
                >
                  {data?.label}
                </Button>
              </Box>
            ))}
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
          status={status}
          setOpenEventModal={setOpenEventModal}
          handleDelete={handleDelete}
          theme={theme}
          handleEventMouseLeave={handleEventMouseLeave}
          handleEventMouseEnter={handleEventMouseEnter}
          hoveredEvent={hoveredEvent}
          meetingActiveType={meetingActiveType}
        />
      </Box>
      {openDeleteModal && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={openDeleteModal?.isOpen}
          handleClose={() => setOpenDeleteModal({})}
          handleSubmitBtn={handleDeleteSubmit}
          loading={deleteMeetingsStatus?.isLoading}
          disableCancelBtn={deleteMeetingsStatus?.isLoading}
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
