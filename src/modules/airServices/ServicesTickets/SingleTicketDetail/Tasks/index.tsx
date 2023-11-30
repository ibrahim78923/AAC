import TanstackTable from '@/components/Table/TanstackTable';
import { tasksTableColumns, tasksTableData } from './Tasks.data';
import { TaskDrawer } from './TasksDrawers';
import { useTasks } from './useTasks';
import { TasksHeader } from './TasksHeader';

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
    theme,
  } = useTasks();
  return (
    <div>
      <TasksHeader
        setIsAddDrawerOpen={setIsAddDrawerOpen}
        activeCheck={activeCheck}
        setIsEditDrawerOpen={setIsEditDrawerOpen}
      />
      <br />
      <TanstackTable
        columns={tasksTableColumns(
          activeCheck,
          setActiveCheck,
          setIsDetailDrawerOpen,
          theme,
        )}
        data={tasksTableData}
      />
      <TaskDrawer
        isDrawerOpen={isAddDrawerOpen}
        onClose={setIsAddDrawerOpen}
        type="add"
      />
      <TaskDrawer
        isDrawerOpen={isEditDrawerOpen}
        onClose={setIsEditDrawerOpen}
        type="edit"
      />
      <TaskDrawer
        isDrawerOpen={isDetailDrawerOpen}
        onClose={setIsDetailDrawerOpen}
        taskDetail={
          tasksTableData[
            tasksTableData?.findIndex(
              (e: any) => e?.taskID === isDetailDrawerOpen,
            )
          ]
        }
      />
    </div>
  );
};
