import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Table.data';
import { TotalMarketingEmail } from '@/mock/modules/airMarketer/Dashboard';

const Table = ({ tableData }: any) => {
  const isDynamicData = tableData ? tableData : TotalMarketingEmail;
  return <TanstackTable columns={columns} data={isDynamicData} />;
};
export default Table;
