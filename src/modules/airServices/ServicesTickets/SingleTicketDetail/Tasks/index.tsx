import TanstackTable from '@/components/Table/TanstackTable';
import { useTasks } from './useTasks';
import { TasksHeader } from './TasksHeader';
import { AddTaskDrawer } from './TasksDrawers/AddTaskDrawer';
import { EditTaskDrawer } from './TasksDrawers/EditTaskDrawer';
import { DetailTaskDrawer } from './TasksDrawers/DetailTaskDrawer';

export const Tasks = () => {
  const {
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    isDetailDrawerOpen,
    setIsDetailDrawerOpen,
    activeCheck,
    setActiveCheck,
    isEditDrawerOpen,
    setIsEditDrawerOpen,
    tableColumn,
    tableData,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    meta,
    setPage,
    setPageLimit,
    page,
    pageLimit,
  } = useTasks();
  return (
    <>
      <TasksHeader
        setIsAddDrawerOpen={setIsAddDrawerOpen}
        activeCheck={activeCheck}
        setActiveCheck={setActiveCheck}
        setIsEditDrawerOpen={setIsEditDrawerOpen}
      />
      <br />
      <TanstackTable
        columns={tableColumn}
        data={tableData}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        isPagination
        count={meta?.pages}
        pageLimit={pageLimit}
        currentPage={page}
        totalRecords={meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
      />
      <AddTaskDrawer
        isDrawerOpen={isAddDrawerOpen}
        onClose={setIsAddDrawerOpen}
      />
      <EditTaskDrawer
        isDrawerOpen={isEditDrawerOpen}
        onClose={setIsEditDrawerOpen}
        activeCheck={activeCheck}
        setActiveCheck={setActiveCheck}
      />
      <DetailTaskDrawer
        isDrawerOpen={isDetailDrawerOpen}
        onClose={setIsDetailDrawerOpen}
        taskDetail={
          tableData?.[
            tableData?.findIndex((e: any) => e?._id === isDetailDrawerOpen)
          ]
        }
      />
    </>
  );
};
