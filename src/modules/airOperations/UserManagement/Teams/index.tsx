import TanstackTable from '@/components/Table/TanstackTable';
import { useTeams } from './useTeams';
import { Box, Button } from '@mui/material';
import { AddWhiteBgIcon } from '@/assets/icons';
import Search from '@/components/Search';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS } from '@/constants/permission-keys';

export const Teams = () => {
  const {
    operationsTeamsListColumn,
    setPageLimit,
    setPage,
    setSearch,
    isPortalOpen,
    setIsPortalOpen,
    lazyGetTeamListForOperationStatus,
    renderPortalComponent,
  } = useTeams();
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={2}
        flexWrap={'wrap'}
      >
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS?.SEARCH_RECORD,
          ]}
        >
          <Box>
            <Search label="Search Here" setSearchBy={setSearch} />
          </Box>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS?.CREATE_TEAM,
          ]}
        >
          <Button
            className="small"
            variant="contained"
            startIcon={<AddWhiteBgIcon />}
            onClick={() => {
              setIsPortalOpen?.({
                isOpen: true,
                isUpsert: true,
              });
            }}
          >
            Create Team
          </Button>
        </PermissionsGuard>
      </Box>
      <br />

      <TanstackTable
        data={lazyGetTeamListForOperationStatus?.data?.data?.userTeams ?? []}
        columns={operationsTeamsListColumn}
        isPagination
        isLoading={lazyGetTeamListForOperationStatus?.isLoading}
        isError={lazyGetTeamListForOperationStatus?.isError}
        isFetching={lazyGetTeamListForOperationStatus?.isFetching}
        isSuccess={lazyGetTeamListForOperationStatus?.isSuccess}
        setPageLimit={setPageLimit}
        setPage={setPage}
        count={lazyGetTeamListForOperationStatus?.data?.data?.meta?.pages}
        totalRecords={
          lazyGetTeamListForOperationStatus?.data?.data?.meta?.total
        }
        onPageChange={(page: number) => setPage(page)}
        currentPage={lazyGetTeamListForOperationStatus?.data?.data?.meta?.page}
        pageLimit={lazyGetTeamListForOperationStatus?.data?.data?.meta?.limit}
      />

      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
