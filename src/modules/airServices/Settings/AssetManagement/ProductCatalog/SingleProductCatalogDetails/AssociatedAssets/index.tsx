import { Box, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useAssociatedAssets } from './useAssociatedAssets';
import { AddAsset } from './AddAsset';
import { Fragment } from 'react';

export const AssociatedAssets = () => {
  const {
    associatedAssetsColumns,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleSubmitDelete,
    setAddModalOpen,
    addModalOpen,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setLimit,
  } = useAssociatedAssets();

  return (
    <Fragment>
      <Box textAlign={'end'} mb={2}>
        <Button
          startIcon={<AddCircleIcon />}
          color={'secondary'}
          onClick={() => setAddModalOpen?.(true)}
        >
          Add Asset
        </Button>
      </Box>

      <TanstackTable
        data={data?.data?.productcatalogs?.[0]?.associatedAssets}
        columns={associatedAssetsColumns}
        isPagination
        currentPage={data?.data?.meta?.page}
        count={data?.data?.meta?.pages}
        pageLimit={data?.data?.meta?.limit}
        totalRecords={data?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setLimit}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
      />

      {isDeleteModalOpen && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={isDeleteModalOpen?.open}
          handleClose={() => setIsDeleteModalOpen?.({ open: false, id: '' })}
          handleSubmitBtn={handleSubmitDelete}
          message="Are you sure want to delete this Asset?"
        />
      )}

      {addModalOpen && (
        <AddAsset
          addModalOpen={addModalOpen}
          setAddModalOpen={setAddModalOpen}
        />
      )}
    </Fragment>
  );
};
