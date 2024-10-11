import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './Table.data';
import { TotalMarketingEmail } from '@/mock/modules/airMarketer/Dashboard';

const Table = () => {
  return <TanstackTable columns={columns} data={TotalMarketingEmail} />;
};
export default Table;
