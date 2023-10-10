import TanstackTable from '@/components/Tabel/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import {
  associatesListsData,
  associatesListsColumnFunction,
} from './AssociatesList.data';
import { useAssociatesLists } from './useAssociatesList';
import { AssociatesListHeader } from './AssociatesListHeader';

export const AssociatesListsTableView = () => {
  const { deleteModal, setDeleteModal, submitDeleteModel } =
    useAssociatesLists();
  return (
    <>
      <AssociatesListHeader />
      <br />
      <TanstackTable
        columns={associatesListsColumnFunction(setDeleteModal)}
        data={associatesListsData}
      />
      <AlertModals
        open={deleteModal}
        message="Are you sure you want to delete this Associate Asset?"
        handleClose={() => setDeleteModal(false)}
        handleSubmit={submitDeleteModel}
        type="delete"
      />
    </>
  );
};
