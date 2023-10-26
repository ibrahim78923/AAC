import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import {
  associatesListsData,
  associatesListsColumnFunction,
} from './AssociatesList.data';
import { useAssociatesLists } from './useAssociatesList';
import { AddAssociationsDrawer } from '../AddAssociationsDrawer';
import { PageTitledHeader } from '@/components/PageTitledHeader';

const DELETE_MESSAGE = 'Are you sure you want to delete this Associate Asset?';
const MODAL_TYPE = 'delete';

export const AssociatesListsTableView = () => {
  const {
    deleteModal,
    setDeleteModal,
    submitDeleteModel,
    openDrawer,
    setOpenDrawer,
  } = useAssociatesLists();
  return (
    <>
      <br />
      <PageTitledHeader
        title={'Associations'}
        addTitle={'  Add Associations'}
        handleAction={() => setOpenDrawer(true)}
      />

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
      <AddAssociationsDrawer
        open={openDrawer}
        setDrawerOpen={() => setOpenDrawer(false)}
      />
    </>
  );
};
