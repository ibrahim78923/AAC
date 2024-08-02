import { Box, Button, Grid } from '@mui/material';
import { MeetingCards } from './MeetingCards';
import { useMeeting } from './useMeeting';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { listViewDetails } from './Meeting.data';
import { SOCIAL_COMPONENTS } from '@/constants';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { PlusIcon } from '@/assets/icons';

export const Meeting = () => {
  const {
    meetings,
    setSearch,
    setCardValue,
    theme,
    setDeleteModal,
    deleteModal,
    submitDeleteModal,
    router,
    isActiveCard,
    activeCard,
    ticketId,
    getMeetingListStatus,
    setPageLimit,
    setPage,
    setOpenForm,
    meetingActiveType,
    deleteMeetingsStatus,
  } = useMeeting();
  return (
    <Box p={1}>
      <Grid container spacing={2}>
        {meetings?.map((meeting: any) => (
          <MeetingCards
            key={meeting?.id}
            meetingHeading={meeting?.meetingHeading}
            meetingType={meeting?.meetingType}
            meetingCount={meeting?.meetingCount}
            color={meeting?.color}
            setCardValue={setCardValue}
            isActive={isActiveCard === meeting?.meetingType}
            onClick={activeCard}
          />
        ))}
      </Grid>
      <Box
        p={2}
        border={`.1rem solid ${theme?.palette?.custom?.dark}`}
        borderRadius={3}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={1}
        >
          <Search label="Search Here" setSearchBy={setSearch} />

          <Button
            startIcon={<PlusIcon />}
            variant="contained"
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              router?.push({
                pathname: SOCIAL_COMPONENTS?.SCHEDULE_MEETING,
                query: {
                  ticketId: ticketId,
                  moduleType: 'TICKET',
                },
              })
            }
          >
            Schedule Meeting
          </Button>
        </Box>
        <br />
        <TanstackTable
          columns={listViewDetails(
            setDeleteModal,
            setOpenForm,
            router,
            meetingActiveType,
          )}
          data={getMeetingListStatus?.data?.data?.meetings}
          isLoading={getMeetingListStatus?.isLoading}
          currentPage={getMeetingListStatus?.data?.data?.meta?.page}
          count={getMeetingListStatus?.data?.data?.meta?.pages}
          pageLimit={getMeetingListStatus?.data?.data?.meta?.limit}
          totalRecords={getMeetingListStatus?.data?.data?.meta?.total}
          setPage={setPage}
          setPageLimit={setPageLimit}
          isFetching={getMeetingListStatus?.isFetching}
          isError={getMeetingListStatus?.isError}
          isSuccess={getMeetingListStatus?.isSuccess}
          onPageChange={(page: any) => setPage(page)}
          isPagination
        />
      </Box>
      {deleteModal && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          message={'Are you sure you want to delete this entry?'}
          open={deleteModal?.isOpen}
          handleClose={() => {
            setDeleteModal(false);
          }}
          handleSubmitBtn={() => {
            submitDeleteModal();
          }}
          loading={deleteMeetingsStatus?.isLoading}
          disableCancelBtn={deleteMeetingsStatus?.isLoading}
        />
      )}
    </Box>
  );
};
