import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Tasks.data';
import { tableData } from '@/mock/modules/airMarketer/Compaigns/Tasks';

const Tasks = () => {
  return (
    <>
      <TanstackTable columns={columns} data={tableData} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};

export default Tasks;
