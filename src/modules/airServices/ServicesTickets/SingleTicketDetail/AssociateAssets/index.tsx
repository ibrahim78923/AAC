import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { useAssociateAssets } from './useAssociateAssets';
import { associatesListsColumnFunction } from './AssociateAssets.data';
import { AddAssociations } from './AddAssociations';

export const AssociateAssets = () => {
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
    router,
    deleteTicketsAssociatesAssetsStatus,
  } = useAssociateAssets();

  if (isLoading || isFetching) return <SkeletonForm />;

  return (
    <>
      <PageTitledHeader
        title={` Associations (${
          data?.data?.tickets?.length > 1
            ? data?.data?.meta?.total
            : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
            ? data?.data?.meta?.total
            : 0
        })`}
        addTitle={'Add Associations'}
        handleAction={() => setOpenDrawer(true)}
        hasEndIcon
        hasStartIcon={false}
        createPermissionKey={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_ASSOCIATE_ASSETS,
        ]}
      />

      <br />
      <PermissionsGuard
        permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ASSET_LIST_VIEW]}
      >
        <TanstackTable
          columns={associatesListsColumnFunction(theme, setAssetId, router)}
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
          pageLimit={data?.data?.meta?.limit}
          onPageChange={(page: any) => setPage(page)}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      </PermissionsGuard>
      {deleteModal && (
        <AlertModals
          open={deleteModal}
          message="Are you sure you want to detach this asset ?"
          handleClose={() => setDeleteModal(false)}
          handleSubmitBtn={() => deleteTicketsAssociatesAssets?.()}
          type={ALERT_MODALS_TYPE?.DELETE}
          cancelBtnText="Cancel"
          submitBtnText="Detach"
          loading={deleteTicketsAssociatesAssetsStatus?.isLoading}
          disableCancelBtn={deleteTicketsAssociatesAssetsStatus?.isLoading}
        />
      )}
      {openDrawer && (
        <AddAssociations
          open={openDrawer}
          setDrawerOpen={() => setOpenDrawer(false)}
        />
      )}
    </>
  );
};
