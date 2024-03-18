import TanstackTable from '@/components/Table/TanstackTable';
import { useAssets } from './useAssets';
import { Typography } from '@mui/material';

export const Assets = () => {
  const {
    setPage,
    setPageLimit,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    inventoryListsColumns,
  }: any = useAssets();
  return (
    <>
      <Typography variant="h4" color="SlateBlue.main">
        Assets
      </Typography>
      <br />
      <TanstackTable
        columns={inventoryListsColumns}
        data={data?.data?.inventories}
        isLoading={isLoading}
        currentPage={data?.data?.meta?.page}
        count={data?.data?.meta?.pages}
        pageLimit={data?.data?.meta?.limit}
        totalRecords={data?.data?.meta?.total}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        onPageChange={(page: any) => setPage(page)}
        isPagination
      />
    </>
  );
};
