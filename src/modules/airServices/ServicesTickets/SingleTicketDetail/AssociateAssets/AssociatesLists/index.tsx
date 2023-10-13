import TanstackTable from '@/components/Tabel/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import {
  associatesListsData,
  associatesListsColumnFunction,
} from './AssociatesList.data';
import { useAssociatesLists } from './useAssociatesList';
import { AssociatesListHeader } from './AssociatesListHeader';

const DELETE_MESSAGE = 'Are you sure you want to delete this Associate Asset?';
const MODAL_TYPE = 'delete';
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
        message={DELETE_MESSAGE}
        handleClose={() => setDeleteModal(false)}
        handleSubmit={submitDeleteModel}
        type={MODAL_TYPE}
      />
    </>
  );
};
