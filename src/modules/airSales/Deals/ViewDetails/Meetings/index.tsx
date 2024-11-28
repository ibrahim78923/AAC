import { Box, Button, Grid } from '@mui/material';
import { useMeetings } from './useMeetings';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { listViewDetails } from './Meetings.data';
import { MODULE_NAME_FOR_MEETINGS, SOCIAL_COMPONENTS } from '@/constants';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { PlusIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS } from '@/constants/permission-keys';
import { MeetingCards } from './MeetingCards';

const Meetings = () => {
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
    moduleId,
    getMeetingListStatus,
    setPageLimit,
    setPage,
    setOpenForm,
    meetingActiveType,
    deleteMeetingsStatus,
  } = useMeetings();
  return (
    <Box p={1}>
      <PermissionsGuard
        permissions={[
          SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.SHOW_COUNT_WIDGETS,
        ]}
      >
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
      </PermissionsGuard>
      <Box
        p={2}
        border={`.1rem solid ${theme?.palette?.custom?.dark}`}
        borderRadius={3}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          flexWrap={'wrap'}
          gap={1}
        >
          <PermissionsGuard
            permissions={[
              SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.SEARCH_RECORD,
            ]}
          >
            <Search label="Search Here" setSearchBy={setSearch} />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.CREATE_MEETING,
            ]}
          >
            <Button
              startIcon={<PlusIcon />}
              variant="contained"
              sx={{ cursor: 'pointer' }}
              className="small"
              onClick={() =>
                router?.push({
                  pathname: SOCIAL_COMPONENTS?.SCHEDULE_MEETING,
                  query: {
                    moduleId: moduleId,
                    moduleType: MODULE_NAME_FOR_MEETINGS?.DEALS,
                  },
                })
              }
            >
              Schedule Meetings
            </Button>
          </PermissionsGuard>
        </Box>
        <br />
        <PermissionsGuard
          permissions={[SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.LIST_VIEW]}
        >
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
            onPageChange={(page: number) => setPage(page)}
            isPagination
          />
        </PermissionsGuard>
      </Box>
      {deleteModal && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          message={'Are you sure you want to delete this entry?'}
          open={deleteModal?.isOpen ?? false}
          handleClose={() => {
            setDeleteModal({});
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

export default Meetings;
