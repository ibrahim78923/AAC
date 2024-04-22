import TanstackTable from '@/components/Table/TanstackTable';
import { SalesWorkflowSubHeader } from '../../SalesWorkflowSubHeader';
import { DeleteSalesWorkflow } from '../../DeleteSalesWorkflow';
import { useQuote } from './useQuote';

export const Quote = () => {
  const {
    isFilterOpen,
    setIsFilterOpen,
    search,
    setSearch,
    openDelete,
    setOpenDelete,
    tableColumns,
    actionDropdown,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    meta,
    tableData,
    limit,
    setLimit,
    page,
    setPage,
    activeCheck,
    onSubmitFilter,
    handleDelete,
    deleteLoading,
    handleWorkflow,
  } = useQuote();
  return (
    <>
      <SalesWorkflowSubHeader
        disabledActionButton={!!!activeCheck?.length}
        search={search}
        setSearch={setSearch}
        salesWorkflowActionDropdown={actionDropdown}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        onSubmit={onSubmitFilter}
        loading={isLoading || isFetching}
        handleWorkflow={handleWorkflow}
      />
      <br />
      <TanstackTable
        columns={tableColumns}
        data={tableData}
        isPagination
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        count={meta?.pages}
        pageLimit={limit}
        currentPage={page}
        totalRecords={meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setLimit}
      />
      <DeleteSalesWorkflow
        deleteWorkflow={openDelete}
        setDeleteWorkflow={setOpenDelete}
        handleSubmit={handleDelete}
        loading={deleteLoading}
      />
    </>
  );
};
