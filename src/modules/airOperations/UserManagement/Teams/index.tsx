import TanstackTable from '@/components/Table/TanstackTable';
import { useTeams } from './useTeams';
import { Box, Button } from '@mui/material';
import { AddWhiteBgIcon } from '@/assets/icons';
import Search from '@/components/Search';

export const Teams = () => {
  const {
    teamListColumn,
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
        <Box>
          <Search label="Search Here" setSearchBy={setSearch} />
        </Box>
        <Button
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
      </Box>
      <br />
      <TanstackTable
        data={lazyGetTeamListForOperationStatus?.data?.data?.userteams ?? []}
        columns={teamListColumn}
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
        onPageChange={(page: any) => setPage(page)}
        currentPage={lazyGetTeamListForOperationStatus?.data?.data?.meta?.page}
        pageLimit={lazyGetTeamListForOperationStatus?.data?.data?.meta?.limit}
      />
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
