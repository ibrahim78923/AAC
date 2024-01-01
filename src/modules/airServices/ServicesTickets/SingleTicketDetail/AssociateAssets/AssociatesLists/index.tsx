import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { associatesListsColumnFunction } from './AssociatesList.data';
import { useAssociatesLists } from './useAssociatesList';
import { AddAssociationsDrawer } from '../AddAssociationsDrawer';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const AssociatesLists = (props: any) => {
  const {
    deleteModal,
    setDeleteModal,
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
    deleteTicketsAssociatesAssets,
    setAssetId,
  } = useAssociatesLists(props);

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
        columns={associatesListsColumnFunction(theme, setAssetId)}
        data={
          data?.data?.tickets?.length > 1
            ? data?.data?.tickets
            : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
            ? data?.data?.tickets
            : []
        }
        isPagination
        isSuccess={isSuccess}
        isError={isError}
        isFetching={isFetching}
        isLoading={isLoading}
        currentPage={
          data?.data?.tickets?.length > 1
            ? data?.data?.meta?.page
            : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
            ? data?.data?.meta?.page
            : 0
        }
        count={
          data?.data?.tickets?.length > 1
            ? data?.data?.meta?.pages
            : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
            ? data?.data?.meta?.pages
            : 0
        }
        totalRecords={
          data?.data?.tickets?.length > 1
            ? data?.data?.meta?.total
            : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
            ? data?.data?.meta?.total
            : 0
        }
        // currentPage={data?.data?.meta?.page}
        // count={data?.data?.meta?.pages}
        pageLimit={data?.data?.meta?.limit}
        // totalRecords={data?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
      />
      <AlertModals
        open={deleteModal}
        message="Are you sure you want to detach this asset"
        handleClose={() => setDeleteModal(false)}
        handleSubmitBtn={() => deleteTicketsAssociatesAssets?.()}
        type={ALERT_MODALS_TYPE?.DELETE}
      />
      <AddAssociationsDrawer
        open={openDrawer}
        setDrawerOpen={() => setOpenDrawer(false)}
      />
    </>
  );
};
