import { Box, Typography } from '@mui/material';
import { InventoryCard } from '@/components/Cards/InventoryCard/index';
import { usePurchaseOrders } from './usePurchaseOrders';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

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
    refetch,
  } = usePurchaseOrders();

  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_RESPECTIVE_PURCHASE_ORDER,
      ]}
    >
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasNoData={!data?.data?.purchaseOrdersList?.length}
        hasError={isError}
        refreshApi={refetch}
        noDataMessage="No purchase order associated"
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={
          SKELETON_TYPES?.SMALL_HORIZONTAL_TWO_LAYER_CIRCULAR_CARD
        }
      >
        {data?.data?.purchaseOrdersList?.map((singlePurchaseOrder: any) => (
          <Box key={singlePurchaseOrder?._id}>
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
                <Typography
                  variant={'body1'}
                  color={theme?.palette?.grey?.[900]}
                >
                  Cost:
                </Typography>
                <Typography variant={'body1'}>
                  £{singlePurchaseOrder?.subTotal}
                </Typography>
              </Box>
            </InventoryCard>
          </Box>
        ))}
      </ApiRequestFlow>
    </PermissionsGuard>
  );
};
