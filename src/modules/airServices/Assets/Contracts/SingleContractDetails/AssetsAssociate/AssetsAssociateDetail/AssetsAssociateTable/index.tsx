import TanstackTable from '@/components/Table/TanstackTable';
import {
  AssetsAssociateTableColumns,
  AssetsAssociateTableData,
} from './AssetsAssociateTable.data';

export const AssetsAssociateTable = ({ activeCheck, setActiveCheck }: any) => {
  return (
    <TanstackTable
      data={AssetsAssociateTableData}
      columns={AssetsAssociateTableColumns(activeCheck, setActiveCheck)}
    />
  );
};
