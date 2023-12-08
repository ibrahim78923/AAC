import TanstackTable from '@/components/Table/TanstackTable';
import { allTabTableData, columns } from './Table.data';

const Table = () => {
  return (
    <TanstackTable columns={columns} data={allTabTableData} isPagination />
  );
};
export default Table;
