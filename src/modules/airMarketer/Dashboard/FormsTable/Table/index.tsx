import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Table.data';
import { FormsTableData } from '@/mock/modules/airMarketer/Dashboard';

const Table = () => {
  return <TanstackTable columns={columns} data={FormsTableData} />;
};
export default Table;
