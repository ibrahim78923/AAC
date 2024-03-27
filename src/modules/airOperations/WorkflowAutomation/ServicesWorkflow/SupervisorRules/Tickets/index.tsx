import TanstackTable from '@/components/Table/TanstackTable';
import { useTickets } from './useTickets';
import TicketsHeader from './TicketsHeader';

const Tickets = () => {
  const {
    ticketsListsColumns,
    listData,
    isLoading,
    isSuccess,
    isFetching,
    setLimit,
    setPage,
    ticketsData,
    limit,
    setSearch,
    search,
    onSubmitListFilter,
    isDrawerOpen,
    setIsDrawerOpen,
    selectedAction,
    router,
    deleteWorkflow,
    setDeleteWorkflow,
    dropdownOptions,
    setSelectedAction,
  } = useTickets();
  return (
    <>
      <TicketsHeader
        selectedList={!!!selectedAction?.length}
        setSearch={setSearch}
        search={search}
        onSubmitListFilter={onSubmitListFilter}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        router={router}
        deleteWorkflow={deleteWorkflow}
        setDeleteWorkflow={setDeleteWorkflow}
        dropdownOptions={dropdownOptions}
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
      />
      <TanstackTable
        data={listData}
        columns={ticketsListsColumns}
        isPagination
        isFetching={isFetching}
        isSuccess={isSuccess}
        isLoading={isLoading}
        setLimit={setLimit}
        setPage={setPage}
        count={ticketsData?.meta?.pages}
        totalRecords={ticketsData?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        currentPage={ticketsData?.meta?.page}
        limit={limit}
      />
    </>
  );
};

export default Tickets;
