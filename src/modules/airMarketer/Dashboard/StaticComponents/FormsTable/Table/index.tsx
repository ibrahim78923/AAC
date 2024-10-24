import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Table.data';
import { FormsTableData } from '@/mock/modules/airMarketer/Dashboard';

const Table = ({ tableData }: any) => {
  const isDynamicData = tableData ? tableData : FormsTableData;
  return <TanstackTable columns={columns} data={isDynamicData} />;
};
export default Table;
