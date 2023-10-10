import TanstackTable from '@/components/Tabel/TanstackTable';
import { ManageDashboardTableData, columns } from './Table.data';

const Table = () => {
  return <TanstackTable columns={columns} data={ManageDashboardTableData} />;
};
export default Table;
