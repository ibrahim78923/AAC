import TanstackTable from '@/components/Tabel/TanstackTable';
import {
  ContractsTableColumns,
  ContractsTableData,
} from './ContractsTable.utils';

export const ContractsTable = () => {
  return (
    <>
      <TanstackTable
        data={ContractsTableData}
        columns={ContractsTableColumns()}
      />
    </>
  );
};
