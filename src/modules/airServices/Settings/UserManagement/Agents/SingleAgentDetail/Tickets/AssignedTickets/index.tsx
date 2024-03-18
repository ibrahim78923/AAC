import TanstackTable from '@/components/Table/TanstackTable';
import { useAssignedTickets } from './useAssignedTickets';
import { Typography } from '@mui/material';

export const AssignedTickets = () => {
  const {
    setPage,
    setPageLimit,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    assignedTicketsColumns,
  }: any = useAssignedTickets();

  return (
    <>
      <Typography variant="h4" color="SlateBlue.main">
        Assigned
      </Typography>
      <br />
      <TanstackTable
        columns={assignedTicketsColumns}
        data={data?.data?.tickets}
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
