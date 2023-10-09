import TanstackTable from '@/components/Tabel/TanstackTable';
import { useAssociatesLists } from './useAssociatesList';
import { associatesListsData } from './AssociatesList.data';
import { AssociatesListHeader } from './AssociatesListHeader';

export const AssociatesListsTableView = () => {
  const { associatesListsColumn } = useAssociatesLists();
  return (
    <>
      <AssociatesListHeader />
      <br />
      <TanstackTable
        columns={associatesListsColumn}
        data={associatesListsData}
      />
    </>
  );
};
