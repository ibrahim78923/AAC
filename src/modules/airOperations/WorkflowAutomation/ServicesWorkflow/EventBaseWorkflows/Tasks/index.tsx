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
    setPageLimit,
    setPage,
    pageLimit,
  } = useTasks();
  return (
    <>
      <TasksHeader selectedTasksList={selectedTasksList} />
      <TanstackTable
        data={taskListData}
        columns={tasksListsColumns}
        isPagination
        isFetching={isFetching}
        isSuccess={isSuccess}
        isLoading={isLoading}
        setPageLimit={setPageLimit}
        setPage={setPage}
        count={taskData?.meta?.pages}
        totalRecords={taskData?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        currentPage={taskData?.meta?.page}
        pageLimit={pageLimit}
      />
    </>
  );
};

export default Tasks;
