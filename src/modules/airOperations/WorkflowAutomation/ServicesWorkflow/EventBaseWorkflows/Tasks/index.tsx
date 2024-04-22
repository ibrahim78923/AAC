import TanstackTable from '@/components/Table/TanstackTable';
import { useTasks } from './useTasks';
import ListViewHeader from '../ListViewHeader';

const Tasks = () => {
  const {
    selectedAction,
    tasksListsColumns,
    listData,
    taskData,
    isLoading,
    isSuccess,
    isFetching,
    setPage,
    limit,
    setLimit,
    setSearch,
    search,
    onSubmitListFilter,
    isDrawerOpen,
    setIsDrawerOpen,
    router,
    deleteWorkflow,
    setDeleteWorkflow,
    dropdownOptions,
    setSelectedAction,
    totalRecords,
    page,
    isError,
    handleWorkflow,
  } = useTasks();
  return (
    <>
      <ListViewHeader
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
        totalRecords={totalRecords}
        page={page}
        setPage={setPage}
        listData={listData}
        handleWorkflow={handleWorkflow}
      />
      <TanstackTable
        data={listData}
        columns={tasksListsColumns}
        isPagination
        isFetching={isFetching}
        isSuccess={isSuccess}
        isLoading={isLoading}
        isError={isError}
        setLimit={setLimit}
        setPage={setPage}
        count={taskData?.meta?.pages}
        totalRecords={taskData?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        currentPage={taskData?.meta?.page}
        limit={limit}
      />
    </>
  );
};

export default Tasks;
