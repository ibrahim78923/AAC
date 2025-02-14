import TanstackTable from '@/components/Table/TanstackTable';
import { useSalesListView } from './useSalesListView';
import { SalesWorkflowSubHeader } from './SalesWorkflowSubHeader';
import { DeleteSalesWorkflow } from '../DeleteSalesWorkflow';

export const SalesListView = ({ module }: { module: string }) => {
  const {
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    openDelete,
    setOpenDelete,
    tableColumns,
    actionDropdown,
    setLimit,
    setPage,
    activeCheck,
    onSubmitFilter,
    handleDelete,
    deleteLoading,
    handleWorkflow,
    getWorkflowStatus,
  } = useSalesListView({ module });
  return (
    <>
      <SalesWorkflowSubHeader
        disabledActionButton={!!!activeCheck?.length}
        handleSearch={handleSearch}
        salesWorkflowActionDropdown={actionDropdown}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        onSubmit={onSubmitFilter}
        loading={getWorkflowStatus?.isLoading || getWorkflowStatus?.isFetching}
        handleWorkflow={handleWorkflow}
      />
      <br />
      <TanstackTable
        columns={tableColumns}
        data={getWorkflowStatus?.data?.data?.workFlows}
        isPagination
        isLoading={getWorkflowStatus?.isLoading}
        isFetching={getWorkflowStatus?.isFetching}
        isError={getWorkflowStatus?.isError}
        isSuccess={getWorkflowStatus?.isSuccess}
        count={getWorkflowStatus?.data?.data?.meta?.pages}
        pageLimit={getWorkflowStatus?.data?.data?.meta?.limit}
        currentPage={getWorkflowStatus?.data?.data?.meta?.page}
        totalRecords={getWorkflowStatus?.data?.data?.meta?.total}
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
