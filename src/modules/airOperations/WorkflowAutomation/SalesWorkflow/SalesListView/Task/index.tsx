import TanstackTable from '@/components/Table/TanstackTable';
import { SalesWorkflowSubHeader } from '../../SalesWorkflowSubHeader';
import { DeleteSalesWorkflow } from '../../DeleteSalesWorkflow';
import { useTask } from './useTask';

export const Task = () => {
  const {
    isFilterOpen,
    setIsFilterOpen,
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
  } = useTask();
  return (
    <>
      <SalesWorkflowSubHeader
        disabledActionButton={!!!activeCheck?.length}
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
        onPageChange={(page: number) => setPage(page)}
        setPage={setPage}
        setPageLimit={setLimit}
        errorProps={{ canRefresh: true, refresh: handleWorkflow }}
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
