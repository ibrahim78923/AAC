import TanstackTable from '@/components/Table/TanstackTable';
import {
  contractsTableColumns,
  contractsTableData,
} from './ContractsTable.utils';

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
