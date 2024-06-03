import { Box, Button, Grid } from '@mui/material';
import { MeetingCards } from './MeetingCards';
import { useMeeting } from './useMeeting';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { meetingListArray } from './Meeting.data';
import { SOCIAL_COMPONENTS } from '@/constants';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { PlusIcon } from '@/assets/icons';

export const Meeting = () => {
  const {
    meetings,
    setSearch,
    setCardValue,
    listData,
    theme,
    setDeleteModal,
    deleteModal,
    submitDeleteModal,
    router,
    isActiveCard,
    activeCard,
    ticketId,
  } = useMeeting();
  return (
    <Box p={1}>
      <Grid container spacing={2}>
        {meetings?.map((meeting: any) => (
          <MeetingCards
            key={meeting?.id}
            meetingHeading={meeting?.meetingHeading}
            meetingCount={meeting?.meetingCount}
            color={meeting?.color}
            setCardValue={setCardValue}
            isActive={isActiveCard === meeting?.meetingHeading}
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
                },
              })
            }
          >
            Schedule Meeting
          </Button>
        </Box>
        <br />
        <TanstackTable
          data={listData}
          columns={meetingListArray(theme, setDeleteModal)}
          isPagination
        />
      </Box>
      {deleteModal && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          message={'Are you sure you want to delete this entry?'}
          open={open}
          handleClose={() => {
            setDeleteModal(false);
          }}
          handleSubmitBtn={() => {
            submitDeleteModal();
          }}
        />
      )}
    </Box>
  );
};
