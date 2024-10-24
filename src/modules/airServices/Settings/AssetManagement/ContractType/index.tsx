import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants/routes';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import UpsertContract from './UpsertContract';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { Box } from '@mui/material';
import useContractType from './useContractType';

export default function ContractType() {
  const {
    router,
    setOpenDialog,
    isLoading,
    isFetching,
    data,
    contractTypeColumns,
    isError,
    isSuccess,
    openDialog,
    setDeleteModalOpen,
    setPage,
    setPageLimit,
    deleteModalOpen,
    handleDeleteBtn,
    deleteContractTypeStatus,
    refetch,
  } = useContractType();

  return (
    <>
      <PageTitledHeader
        title={'Contract Type & Fields'}
        canMovedBack
        moveBack={() => {
          router?.push({
            pathname: AIR_SERVICES?.ASSET_MANAGEMENT_SETTINGS,
          });
        }}
        addTitle={'New Contract Type'}
        createPermissionKey={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.ADD_NEW_CONTRACTS_FIELDS,
        ]}
        handleAction={() => setOpenDialog({ open: true, data: null })}
        disableAddButton={isLoading || isFetching}
      />

      <Box
        borderRadius={2}
        boxShadow={1}
        border={'1px solid'}
        borderColor={'custom.off_white_three'}
      >
        <TanstackTable
          data={data?.data?.contracttypes}
          columns={contractTypeColumns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isSuccess={isSuccess}
          currentPage={data?.data?.meta?.page}
          count={data?.data?.meta?.pages}
          pageLimit={data?.data?.meta?.limit}
          totalRecords={data?.data?.meta?.total}
          isPagination
          setPage={setPage}
          setPageLimit={setPageLimit}
          onPageChange={(page: any) => setPage(page)}
          errorProps={{ canRefresh: true, refresh: refetch }}
        />
      </Box>

      {openDialog?.open && (
        <UpsertContract openDialog={openDialog} setOpenDialog={setOpenDialog} />
      )}

      {deleteModalOpen?.open && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={deleteModalOpen?.open}
          handleClose={() =>
            setDeleteModalOpen({
              open: false,
              id: null,
            })
          }
          handleSubmitBtn={handleDeleteBtn}
          message="Are you sure you want to delete this Contract Type?"
          loading={deleteContractTypeStatus?.isLoading}
          disableCancelBtn={deleteContractTypeStatus?.isLoading}
        />
      )}
    </>
  );
}
