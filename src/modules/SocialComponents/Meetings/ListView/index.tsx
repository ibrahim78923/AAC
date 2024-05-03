import { Box, Grid, IconButton } from '@mui/material';
import { MeetingCards } from './MeetingCards';
import { useListView } from './useListView';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { listViewDetails } from './ListView.data';
import CalenderViewIcon from '@/assets/icons/modules/SocialComponents/CalenderView/calender-view-icon';
import { SOCIAL_COMPONENTS } from '@/constants';
import { AgentConversionDelete } from './AgentConversionDelete';

export const ListView = () => {
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
  } = useListView();
  return (
    <>
      <Grid container spacing={2}>
        {meetings?.map((meeting: any) => (
          <MeetingCards
            key={meeting?.id}
            meetingHeading={meeting?.meetingHeading}
            meetingCount={meeting?.meetingCount}
            color={meeting?.color}
            setCardValue={setCardValue}
          />
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
          flexWrap={'wrap'}
          gap={1}
        >
          <Search label="Search Here" setSearchBy={setSearch} />
          <IconButton
            sx={{
              height: '44px',
              width: '66px',
              borderRadius: 1,
              border: 1,
            }}
            onClick={() => router?.push(SOCIAL_COMPONENTS?.CALENDER_VIEW)}
          >
            <CalenderViewIcon theme={theme} />
          </IconButton>
        </Box>
        <br />
        <TanstackTable
          data={listData}
          columns={listViewDetails(theme, setDeleteModal)}
          isPagination
        />
      </Box>
      {deleteModal && (
        <AgentConversionDelete
          message={'Are you sure you want to delete this entry?'}
          open={deleteModal}
          handleClose={() => {
            setDeleteModal(false);
          }}
          submitDeleteModal={submitDeleteModal}
        />
      )}
    </>
  );
};
