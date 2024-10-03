import { Box, Button } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useAssociatedAssets } from './useAssociatedAssets';
import { AddAsset } from './AddAsset';
import { Fragment } from 'react';
import { PlusSharedColorIcon } from '@/assets/icons';

export const AssociatedAssets = () => {
  const {
    associatedAssetsColumns,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleSubmitDelete,
    setAddModalOpen,
    addModalOpen,
    productCatalogAssociatedAssetListStatus,
    setPage,
    setPageLimit,
    deleteAssociateAssetStatus,
  } = useAssociatedAssets();

  return (
    <Fragment>
      <Box textAlign={'end'} mb={2}>
        <Button
          startIcon={<PlusSharedColorIcon />}
          color={'primary'}
          variant={'contained'}
          className="small"
          onClick={() => setAddModalOpen?.(true)}
        >
          Add Asset
        </Button>
      </Box>

      <TanstackTable
        data={
          productCatalogAssociatedAssetListStatus?.data?.data?.productcatalogs
            ?.length > 1
            ? productCatalogAssociatedAssetListStatus?.data?.data
                ?.productcatalogs
            : productCatalogAssociatedAssetListStatus?.data?.data
                  ?.productcatalogs?.[0]?.associatedAssets?._id
              ? productCatalogAssociatedAssetListStatus?.data?.data
                  ?.productcatalogs
              : []
        }
        columns={associatedAssetsColumns}
        isPagination
        currentPage={
          productCatalogAssociatedAssetListStatus?.data?.data?.productcatalogs
            ?.length > 1
            ? productCatalogAssociatedAssetListStatus?.data?.data?.meta?.page
            : productCatalogAssociatedAssetListStatus?.data?.data
                  ?.productcatalogs?.[0]?.associatedAssets?._id
              ? productCatalogAssociatedAssetListStatus?.data?.data?.meta?.page
              : 0
        }
        count={
          productCatalogAssociatedAssetListStatus?.data?.data?.productcatalogs
            ?.length > 1
            ? productCatalogAssociatedAssetListStatus?.data?.data?.meta?.pages
            : productCatalogAssociatedAssetListStatus?.data?.data
                  ?.productcatalogs?.[0]?.associatedAssets?._id
              ? productCatalogAssociatedAssetListStatus?.data?.data?.meta?.pages
              : 0
        }
        pageLimit={
          productCatalogAssociatedAssetListStatus?.data?.data?.meta?.limit
        }
        totalRecords={
          productCatalogAssociatedAssetListStatus?.data?.data?.productcatalogs
            ?.length > 1
            ? productCatalogAssociatedAssetListStatus?.data?.data?.meta?.total
            : productCatalogAssociatedAssetListStatus?.data?.data
                  ?.productcatalogs?.[0]?.associatedAssets?._id
              ? productCatalogAssociatedAssetListStatus?.data?.data?.meta?.total
              : 0
        }
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isLoading={productCatalogAssociatedAssetListStatus?.isLoading}
        isFetching={productCatalogAssociatedAssetListStatus?.isFetching}
        isError={productCatalogAssociatedAssetListStatus?.isError}
        isSuccess={productCatalogAssociatedAssetListStatus?.isSuccess}
      />

      {isDeleteModalOpen && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={isDeleteModalOpen?.open}
          handleClose={() => setIsDeleteModalOpen?.({ open: false, id: '' })}
          handleSubmitBtn={handleSubmitDelete}
          message="Are you sure want to delete this Asset?"
          loading={deleteAssociateAssetStatus?.isLoading}
          disableCancelBtn={deleteAssociateAssetStatus?.isLoading}
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
