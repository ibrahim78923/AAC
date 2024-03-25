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
      />
      <TanstackTable
        data={listData}
        columns={tasksListsColumns}
        isPagination
        isFetching={isFetching}
        isSuccess={isSuccess}
        isLoading={isLoading}
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
