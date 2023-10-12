import TanstackTable from '@/components/Tabel/TanstackTable';

import { MeetingDetailsTableData } from '@/mock/modules/airSales/Dashboard/MeetingDetails';
import { columns } from './Table.data';

const Table = () => {
  return <TanstackTable columns={columns} data={MeetingDetailsTableData} />;
};
export default Table;
