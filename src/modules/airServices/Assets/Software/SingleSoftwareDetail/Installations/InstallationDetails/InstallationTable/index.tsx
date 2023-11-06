import TanstackTable from '@/components/Table/TanstackTable';
import {
  installationTableColumns,
  installationTableData,
} from './InstallationTable.data';

export const InstallationTable = ({ activeCheck, setActiveCheck }: any) => {
  return (
    <>
      <TanstackTable
        data={installationTableData}
        columns={installationTableColumns(activeCheck, setActiveCheck)}
      />
    </>
  );
};
