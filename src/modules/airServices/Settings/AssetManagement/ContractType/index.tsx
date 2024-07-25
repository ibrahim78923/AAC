import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { useRouter } from 'next/router';
import { useState } from 'react';
import UpsertContract from './UpsertContract';
import TanstackTable from '@/components/Table/TanstackTable';
import { PAGINATION } from '@/config';
import {
  useDeleteContractTypeMutation,
  useGetContractTypeListQuery,
} from '@/services/airServices/settings/asset-management/contract-type';
import { getContractTypeColumns } from './ContractType.data';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { Box } from '@mui/material';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export default function ContractType() {
  const router: any = useRouter();
  const [openDialog, setOpenDialog] = useState({ open: false, data: null });
  const [deleteModalOpen, setDeleteModalOpen] = useState({
    open: false,
    id: null,
  });

  const contractTypeColumns = getContractTypeColumns(
    setOpenDialog,
    setDeleteModalOpen,
  );

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const params = {
    page: page,
    limit: pageLimit,
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetContractTypeListQuery(params);

  const [deleteContractTypeTrigger, deleteContractTypeStatus] =
    useDeleteContractTypeMutation();

  const handleDeleteBtn = async () => {
    try {
      await deleteContractTypeTrigger(deleteModalOpen?.id)?.unwrap();
      successSnackbar('Contract Type Deleted Successfully!');
      setDeleteModalOpen({
        open: false,
        id: null,
      });
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setDeleteModalOpen({
        open: false,
        id: null,
      });
    }
  };

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
