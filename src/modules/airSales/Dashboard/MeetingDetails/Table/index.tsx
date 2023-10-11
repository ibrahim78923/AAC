import TanstackTable from '@/components/Tabel/TanstackTable';
import { columns } from './Table.data';

import { MeetingDetailsTableData } from '@/mock/modules/airSales/Dashboard/MeetingDetails';

const Table = () => {
  return <TanstackTable columns={columns} data={MeetingDetailsTableData} />;
};
export default Table;
