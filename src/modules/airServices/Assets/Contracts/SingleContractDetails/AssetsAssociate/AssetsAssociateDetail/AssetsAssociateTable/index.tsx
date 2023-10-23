import TanstackTable from '@/components/Tabel/TanstackTable';
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
