import { Box, Button } from '@mui/material';
import { Fragment } from 'react';
import { useVendors } from './useVendors';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { UpsertAsset } from './UpsertVendor';
import { PlusSharedColorIcon } from '@/assets/icons';

export const Vendors = () => {
  const {
    vendorsColumns,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleSubmitDelete,
    setIsUpsertModalOpen,
    isUpsertModalOpen,
    productCatalogVendorListStatus,
    setPage,
    setPageLimit,
    deleteVendorStatus,
  } = useVendors();

  return (
    <Fragment>
      <Box textAlign={'end'} mb={2}>
        <Button
          startIcon={<PlusSharedColorIcon />}
          variant={'contained'}
          color={'primary'}
          className="small"
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
          data={
            productCatalogVendorListStatus?.data?.data?.vendorproductcatalogs
          }
          columns={vendorsColumns}
          isPagination
          currentPage={productCatalogVendorListStatus?.data?.data?.meta?.page}
          count={productCatalogVendorListStatus?.data?.data?.meta?.pages}
          pageLimit={productCatalogVendorListStatus?.data?.data?.meta?.limit}
          totalRecords={productCatalogVendorListStatus?.data?.data?.meta?.total}
          onPageChange={(page: any) => setPage(page)}
          setPage={setPage}
          setPageLimit={setPageLimit}
          isLoading={productCatalogVendorListStatus?.isLoading}
          isFetching={productCatalogVendorListStatus?.isFetching}
          isError={productCatalogVendorListStatus?.isError}
          isSuccess={productCatalogVendorListStatus?.isSuccess}
        />
      </Box>

      {isDeleteModalOpen && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={isDeleteModalOpen?.open}
          handleClose={() => setIsDeleteModalOpen?.({ open: false, id: '' })}
          handleSubmitBtn={handleSubmitDelete}
          message="Are you sure want to delete this Vendor?"
          loading={deleteVendorStatus?.isLoading}
          disableCancelBtn={deleteVendorStatus?.isLoading}
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
