import { Box } from '@mui/material';
import { TeamsHeader } from './TeamsHeader';
import TanstackTable from '@/components/Table/TanstackTable';
import { useTeams } from './useTeams';
import UpsertTeams from './UpsertTeams';
import { AgentConversionDelete } from '../AgentConversionDelete';
import TeamsDetails from './TeamsDetails';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS } from '@/constants/permission-keys';

export const Teams = () => {
  const {
    teamListColumn,
    deleteModal,
    setDeleteModal,
    isTeamDrawerOpen,
    setIsTeamDrawerOpen,
    metaData,
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setPageLimit,
    setPage,
    submitDeleteModal,
    deleteStatus,
    isEditDrawerOpen,
    setIsEditDrawerOpen,
  } = useTeams();

  return (
    <Box>
      <TeamsHeader />
      <br />
      <Box mt={'0.75rem'}>
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.USER_LIST,
          ]}
        >
          <TanstackTable
            data={data?.data?.userTeams}
            columns={teamListColumn}
            isPagination={true}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching}
            isSuccess={isSuccess}
            setPageLimit={setPageLimit}
            setPage={setPage}
            count={metaData?.pages}
            totalRecords={metaData?.total}
            onPageChange={(page: any) => setPage(page)}
            currentPage={metaData?.page}
            pageLimit={metaData?.limit}
          />
        </PermissionsGuard>
        <TeamsDetails
          isTeamDrawerOpen={isTeamDrawerOpen}
          setIsTeamDrawerOpen={setIsTeamDrawerOpen}
          title={'Test'}
          okText={'Save'}
        />
        <UpsertTeams
          isDrawerOpen={isEditDrawerOpen}
          setIsDrawerOpen={setIsEditDrawerOpen}
          title={'Edit Team'}
          okText={'Save'}
        />
        {deleteModal && (
          <AgentConversionDelete
            message={'Are you sure you want to delete this Team?'}
            deleteStatus={deleteStatus}
            open={deleteModal?.val}
            handleClose={() => {
              setDeleteModal(false);
            }}
            submitDeleteModal={submitDeleteModal}
          />
        )}
      </Box>
    </Box>
  );
};
