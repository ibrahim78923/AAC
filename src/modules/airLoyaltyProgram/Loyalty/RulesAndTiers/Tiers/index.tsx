import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { useTiers } from './useTiers';
import { Box } from '@mui/material';
import { SingleTierDetail } from './SingleTierDetail';

export const Tiers = () => {
  const {
    setSearch,
    setPageLimit,
    setPage,
    lazyGetTiersListStatus,
    tiersColumns,
    isPortalOpen,
    setIsPortalOpen,
  } = useTiers();
  return (
    <>
      <Search label="Search Here" setSearchBy={setSearch} />
      <Box marginY={2}></Box>
      <TanstackTable
        columns={tiersColumns}
        data={lazyGetTiersListStatus?.data?.data?.tiers}
        isLoading={lazyGetTiersListStatus?.isLoading}
        currentPage={lazyGetTiersListStatus?.data?.data?.meta?.page}
        count={lazyGetTiersListStatus?.data?.data?.meta?.pages}
        pageLimit={lazyGetTiersListStatus?.data?.data?.meta?.limit}
        totalRecords={lazyGetTiersListStatus?.data?.data?.meta?.total}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isFetching={lazyGetTiersListStatus?.isFetching}
        isError={lazyGetTiersListStatus?.isError}
        isSuccess={lazyGetTiersListStatus?.isSuccess}
        onPageChange={(page: any) => setPage(page)}
        isPagination
      />
      {isPortalOpen?.isOpen && (
        <SingleTierDetail
          isDrawerOpen={isPortalOpen}
          setIsDrawerOpen={setIsPortalOpen}
        />
      )}
    </>
  );
};
