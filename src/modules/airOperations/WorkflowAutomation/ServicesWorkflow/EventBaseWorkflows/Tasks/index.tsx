import TanstackTable from '@/components/Table/TanstackTable';
import { useTasks } from './useTasks';
import TasksHeader from './TasksHeader';

const Tasks = () => {
  const {
    selectedTasksList,
    tasksListsColumns,
    taskListData,
    taskData,
    isLoading,
    isSuccess,
    isFetching,
    setPage,
    limit,
    setLimit,
    setSearch,
    search,
    onSubmitTaskFilter,
    isDrawerOpen,
    setIsDrawerOpen,
  } = useTasks();
  return (
    <>
      <TasksHeader
        selectedTasksList={selectedTasksList}
        setSearch={setSearch}
        search={search}
        onSubmitTaskFilter={onSubmitTaskFilter}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <TanstackTable
        data={taskListData}
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
