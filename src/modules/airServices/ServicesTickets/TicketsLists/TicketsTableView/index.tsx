import { NoAssociationFoundImage } from '@/assets/images';
import CustomPagination from '@/components/CustomPagination';
import NoData from '@/components/NoData';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import TanstackTable from '@/components/Table/TanstackTable';

export const TicketsTableView = (props: any) => {
  const {
    ticketsListsColumn,
    ticketListsData,
    setPage,
    isLoading,
    page,
    totalPages,
  } = props;

  if (isLoading) return <SkeletonTable />;

  return (
    <>
      {!!ticketsListsColumn?.length ? (
        <>
          <TanstackTable columns={ticketsListsColumn} data={ticketListsData} />
          <CustomPagination
            count={totalPages}
            pageLimit={10}
            rowsPerPageOptions={[10]}
            currentPage={page}
            onPageChange={(page: any) => setPage(page)}
          />
        </>
      ) : (
        <NoData
          image={NoAssociationFoundImage}
          message={'No data is available'}
        />
      )}
    </>
  );
};
