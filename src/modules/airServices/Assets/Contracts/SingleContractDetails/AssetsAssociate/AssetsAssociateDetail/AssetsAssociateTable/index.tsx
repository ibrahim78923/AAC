import TanstackTable from '@/components/Table/TanstackTable';
import {
  AssetsAssociateTableColumns,
  AssetsAssociateTableData,
} from './AssetsAssociate.data';

export const AssetsAssociateTable = ({ activeCheck, setActiveCheck }: any) => {
  return (
    <TanstackTable
      data={AssetsAssociateTableData}
      columns={AssetsAssociateTableColumns(activeCheck, setActiveCheck)}
    />
  );
};
