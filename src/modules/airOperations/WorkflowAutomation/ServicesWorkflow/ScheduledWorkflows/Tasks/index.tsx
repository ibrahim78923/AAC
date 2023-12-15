import TanstackTable from '@/components/Table/TanstackTable';
import Header from '../Tickets/Header';
import { assetsListData } from '../Assets/Assets.data';
import { useTasks } from './useTasks';

const Tasks = () => {
  const { selectedTasksList, tasksListsColumns } = useTasks();
  return (
    <>
      <Header selectedTicketsList={selectedTasksList} />
      <TanstackTable
        data={assetsListData}
        columns={tasksListsColumns}
        isPagination
      />
    </>
  );
};

export default Tasks;
