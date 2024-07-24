import NoData from '@/components/NoData';
import { Box, Typography } from '@mui/material';
import { InventoryCard } from '@/components/InventoryCard/index';
import { PurchaseImage } from '@/assets/images';
import { usePurchaseOrders } from './usePurchaseOrders';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import ApiErrorState from '@/components/ApiErrorState';

export const PurchaseOrder = () => {
  const {
    isLoading,
    isFetching,
    isError,
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
    theme,
    setDelateRecord,
    data,
    deleteIsLoading,
  } = usePurchaseOrders();
  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) return <ApiErrorState />;
  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_RESPECTIVE_PURCHASE_ORDER,
      ]}
    >
      {!!data?.data?.purchaseOrdersList?.length ? (
        data?.data?.purchaseOrdersList?.map((singlePurchaseOrder: any) => (
          <div key={singlePurchaseOrder?._id}>
            <InventoryCard
              openDeleteModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
              handleDelete={handleDelete}
              setDelateRecord={setDelateRecord}
              deletedRecordId={singlePurchaseOrder?._id}
              heading={singlePurchaseOrder?.orderName}
              status={singlePurchaseOrder?.status}
              key={singlePurchaseOrder?._id}
              deleteIsLoading={deleteIsLoading?.isLoading}
              showChild
            >
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyItems={'center'}
                gap={'.3rem'}
              >
                <Typography color={theme?.palette?.grey?.[900]}>
                  Cost:
                </Typography>
                <Typography>£{singlePurchaseOrder?.subTotal}</Typography>
              </Box>
            </InventoryCard>
          </div>
        ))
      ) : (
        <NoData
          image={PurchaseImage}
          message={'No purchase order associated'}
        />
      )}
    </PermissionsGuard>
  );
};
