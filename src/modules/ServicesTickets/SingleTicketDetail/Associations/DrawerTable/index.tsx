import TanstackTable from '@/components/Tabel/TanstackTable';
import { DrawerTableColumns, DrawerTableData } from './DrawerTable.utils';

export const DrawerTable = ({ setDrawerData, DrawerData }: any) => {
  return (
    <div>
      <TanstackTable
        columns={DrawerTableColumns(DrawerData, setDrawerData, DrawerTableData)}
        data={DrawerTableData}
      />
    </div>
  );
};
