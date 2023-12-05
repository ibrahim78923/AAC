import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Table/TanstackTable';
import { allTabTableData, columns } from './Table.data';

const Table = () => {
  return (
    <>
      <TanstackTable columns={columns} data={allTabTableData} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};
export default Table;
