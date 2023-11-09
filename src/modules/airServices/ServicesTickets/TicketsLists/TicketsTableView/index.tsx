import CustomPagination from '@/components/CustomPagination';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import TanstackTable from '@/components/Table/TanstackTable';

export const TicketsTableView = (props: any) => {
  const { ticketsListsColumn, ticketListsData, isLoading } = props;
  if (isLoading) return <SkeletonTable />;
  return (
    <>
      <TanstackTable columns={ticketsListsColumn} data={ticketListsData} />
      <CustomPagination
        count={1}
        pageLimit={10}
        rowsPerPageOptions={[10, 25]}
        currentPage={1}
      />
    </>
  );
};
