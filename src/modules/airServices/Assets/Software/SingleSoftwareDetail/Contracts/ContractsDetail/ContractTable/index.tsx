import TanstackTable from '@/components/Tabel/TanstackTable';
import {
  contractsTableColumns,
  contractsTableData,
} from './ContractsTable.data';

export const ContractsTable = () => {
  return (
    <>
      <TanstackTable
        data={contractsTableData}
        columns={contractsTableColumns()}
      />
    </>
  );
};
