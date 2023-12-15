import TanstackTable from '@/components/Table/TanstackTable';
import { assetsListData } from '../Assets/Assets.data';
import { useTasks } from './useTasks';
import TasksHeader from './TasksHeader';

const Tasks = () => {
  const { selectedTasksList, tasksListsColumns } = useTasks();
  return (
    <>
      <TasksHeader selectedTicketsList={selectedTasksList} />
      <TanstackTable
        data={assetsListData}
        columns={tasksListsColumns}
        isPagination
      />
    </>
  );
};

export default Tasks;
