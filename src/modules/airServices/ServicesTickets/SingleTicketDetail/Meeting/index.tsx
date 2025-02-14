import { Box } from '@mui/material';
import { MeetingCards } from './MeetingCards';
import { useMeeting } from './useMeeting';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { listViewDetails } from './Meeting.data';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE, MODULE_TYPE } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS } from '@/constants/permission-keys';
import { SOCIAL_COMPONENTS } from '@/constants/routes';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';

const Meeting = () => {
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
      <PermissionsGuard
        permissions={[
          SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.SHOW_COUNT_WIDGETS,
        ]}
      >
        <ContainerGrid>
          {meetings?.map((meeting: any) => (
            <CustomGrid sm={6} lg={4} key={meeting?.id}>
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
            </CustomGrid>
          ))}
        </ContainerGrid>
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
            <AddNewItemButton
              size="medium"
              name=" Schedule Meeting"
              onClick={() =>
                router?.push({
                  pathname: SOCIAL_COMPONENTS?.SCHEDULE_MEETING,
                  query: {
                    moduleId: ticketId,
                    moduleType: MODULE_TYPE?.TICKET,
                  },
                })
              }
            />
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

export default Meeting;
