import TanstackTable from '@/components/Table/TanstackTable';
import {
  InstallationTableColumns,
  InstallationTableData,
} from './InstallationTable.data';

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
