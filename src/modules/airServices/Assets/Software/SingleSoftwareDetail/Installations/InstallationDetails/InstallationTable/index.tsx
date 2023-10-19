import TanstackTable from '@/components/Tabel/TanstackTable';
import {
  InstallationTableColumns,
  InstallationTableData,
} from './InstallationTable.utils';

export const InstallationTable = ({ activeCheck, setActiveCheck }: any) => {
  return (
    <>
      <TanstackTable
        data={InstallationTableData}
        columns={InstallationTableColumns(activeCheck, setActiveCheck)}
      />
    </>
  );
};
