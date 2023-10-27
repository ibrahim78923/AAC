import TanstackTable from '@/components/Table/TanstackTable';
import { DrawerTableColumns, DrawerTableData } from './DrawerTable.data';

export const DrawerTable = ({ setDrawerData, DrawerData, theme }: any) => {
  return (
    <div>
      <TanstackTable
        columns={DrawerTableColumns(
          DrawerData,
          setDrawerData,
          DrawerTableData,
          theme,
        )}
        data={DrawerTableData}
      />
    </div>
  );
};
