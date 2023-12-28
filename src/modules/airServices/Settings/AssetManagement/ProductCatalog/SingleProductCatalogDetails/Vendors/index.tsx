import { Box, Button } from '@mui/material';
import { Fragment } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useVendors } from './useVendors';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { UpsertAsset } from './UpsertVendor';

export const Vendors = () => {
  const {
    vendorsColumns,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleSubmitDelete,
    setIsUpsertModalOpen,
    isUpsertModalOpen,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setLimit,
  } = useVendors();

  return (
    <Fragment>
      <Box textAlign={'end'} mb={2}>
        <Button
          startIcon={<AddCircleIcon />}
          color={'secondary'}
          onClick={() => setIsUpsertModalOpen?.({ open: true, id: '' })}
        >
          Add Vendor
        </Button>
      </Box>

      <Box
        borderRadius={2}
        boxShadow={1}
        border={`1px solid`}
        borderColor={'custom.off_white_three'}
      >
        <TanstackTable
          data={data?.data?.vendorproductcatalogs}
          columns={vendorsColumns}
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
      </Box>

      {isDeleteModalOpen && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={isDeleteModalOpen?.open}
          handleClose={() => setIsDeleteModalOpen?.({ open: false, id: '' })}
          handleSubmitBtn={handleSubmitDelete}
          message="Are you sure want to delete this Vendor?"
        />
      )}

      {isUpsertModalOpen?.open && (
        <UpsertAsset
          isUpsertModalOpen={isUpsertModalOpen}
          setIsUpsertModalOpen={setIsUpsertModalOpen}
        />
      )}
    </Fragment>
  );
};
