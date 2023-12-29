import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { associatesListsColumnFunction } from './AssociatesList.data';
import { useAssociatesLists } from './useAssociatesList';
import { AddAssociationsDrawer } from '../AddAssociationsDrawer';

const DELETE_MESSAGE = 'Are you sure you want to delete this Associate Asset?';
const MODAL_TYPE = 'delete';

export const AssociatesLists = () => {
  const {
    deleteModal,
    setDeleteModal,
    submitDeleteModel,
    openDrawer,
    setOpenDrawer,
    theme,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setPageLimit,
  } = useAssociatesLists();

  return (
    <>
      <br />
      <PageTitledHeader
        title={'Associations'}
        addTitle={'Add Associations'}
        handleAction={() => setOpenDrawer(true)}
      />

      <br />
      <TanstackTable
        columns={associatesListsColumnFunction(setDeleteModal, theme)}
        data={data?.data?.tickets}
        isPagination
        isSuccess={isSuccess}
        isError={isError}
        isFetching={isFetching}
        isLoading={isLoading}
        currentPage={data?.data?.meta?.page}
        count={data?.data?.meta?.pages}
        pageLimit={data?.data?.meta?.limit}
        totalRecords={data?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
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
