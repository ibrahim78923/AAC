import { Box, Grid, IconButton } from '@mui/material';
import { MeetingCards } from './MeetingCards';
import { useListView } from './useListView';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { listViewDetails } from './ListView.data';
import CalenderViewIcon from '@/assets/icons/modules/SocialComponents/CalenderView/calender-view-icon';
import { SOCIAL_COMPONENTS } from '@/constants';
import { AgentConversionDelete } from './AgentConversionDelete';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS } from '@/constants/permission-keys';

export const ListView = () => {
  const {
    meetings,
    handleSearch,
    theme,
    setDeleteModal,
    deleteModal,
    submitDeleteModal,
    router,
    getMeetingListStatus,
    setPage,
    page,
    setPageLimit,
    setOpenForm,
    meetingActiveType,
    deleteMeetingsStatus,
    getMeetingListData,
  } = useListView();
  return (
    <>
      <Grid container spacing={2}>
        <PermissionsGuard
          permissions={[
            SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.SHOW_COUNT_WIDGETS,
          ]}
        >
          {meetings?.map((meeting: any) => (
            <MeetingCards
              key={meeting?.id}
              meetingHeading={meeting?.meetingHeading}
              meetingType={meeting?.meetingType}
              meetingCount={meeting?.meetingCount}
              color={meeting?.color}
              isActive={router?.query?.type === meeting?.meetingType}
              router={router}
            />
          ))}
        </PermissionsGuard>
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
          <PermissionsGuard
            permissions={[
              SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.SEARCH_RECORD,
            ]}
          >
            <Search label="Search Here" setSearchBy={handleSearch} />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.CALENDAR_VIEW,
            ]}
          >
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
            errorProps={{
              canRefresh: true,
              refresh: () => getMeetingListData?.(page),
            }}
          />
        </PermissionsGuard>
      </Box>
      {deleteModal && (
        <AgentConversionDelete
          message={'Are you sure you want to delete this entry?'}
          open={deleteModal?.isOpen ?? false}
          handleClose={() => {
            setDeleteModal({});
          }}
          submitDeleteModal={submitDeleteModal}
          deleteMeetingsStatus={deleteMeetingsStatus}
        />
      )}
    </>
  );
};
