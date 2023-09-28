import TanstackTable from '@/components/Tabel/TanstackTable';
import { columns, data } from './TicketTasks.mock';

const TicketTasks = () => {
  return (
    <div>
      <TanstackTable columns={columns} data={data} />
    </div>
  );
};

export default TicketTasks;
