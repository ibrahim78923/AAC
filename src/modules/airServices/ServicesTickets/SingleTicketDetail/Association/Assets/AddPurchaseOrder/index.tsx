import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Stack, Typography } from '@mui/material';
import useAddPurchaseOrder from './useAddPurchaseOrder';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from 'next/link';
import { AIR_SERVICES } from '@/constants';

export default function AddPurchaseOrder({ setSelected, selected }: any) {
  const {
    addOrderColumns,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setPageLimit,
    setSearch,
  } = useAddPurchaseOrder({ setSelected, selected });

  return (
    <Stack direction={'column'} spacing={2}>
      <Search label="Search Here" width="100%" setSearchBy={setSearch} />
      <Link
        href={AIR_SERVICES?.NEW_PURCHASE_ORDER}
        style={{ display: 'flex', gap: 1 }}
      >
        <AddCircleIcon color={'primary'} />
        <Typography variant={'body2'}>Add Purchase Order</Typography>
      </Link>
      <TanstackTable
        columns={addOrderColumns}
        data={data?.data?.purchases}
        isPagination
        isSuccess={isSuccess}
        isError={isError}
        isFetching={isFetching}
        isLoading={isLoading}
        currentPage={data?.data?.meta?.page}
        count={data?.data?.meta?.pages}
        pageLimit={data?.data?.meta?.limit}
        totalRecords={data?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
      />
    </Stack>
  );
}
