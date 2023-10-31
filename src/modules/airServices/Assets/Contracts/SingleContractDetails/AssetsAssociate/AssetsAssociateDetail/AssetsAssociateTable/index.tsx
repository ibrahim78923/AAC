import TanstackTable from '@/components/Table/TanstackTable';
import {
  assetsAssociateTableColumns,
  assetsAssociateTableData,
} from './AssetsAssociateTable.data';

export const AssetsAssociateTable = ({ activeCheck, setActiveCheck }: any) => {
  return (
    <TanstackTable
      data={assetsAssociateTableData}
      columns={assetsAssociateTableColumns(activeCheck, setActiveCheck)}
    />
  );
};
