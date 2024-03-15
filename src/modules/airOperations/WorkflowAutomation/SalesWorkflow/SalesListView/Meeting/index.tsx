import TanstackTable from '@/components/Table/TanstackTable';
import { SalesWorkflowSubHeader } from '../../SalesWorkflowSubHeader';
import { DeleteSalesWorkflow } from '../../DeleteSalesWorkflow';
import { useMeeting } from './useMeeting';

export const Meeting = () => {
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
  } = useMeeting();
  return (
    <>
      <SalesWorkflowSubHeader
        disabledActionButton={!!!activeCheck?.length}
        search={search}
        setSearch={setSearch}
        salesWorkflowActionDropdown={actionDropdown}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
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
      />
    </>
  );
};
