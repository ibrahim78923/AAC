import NoData from '@/components/NoData';
import { Box, Typography } from '@mui/material';
import { InventoryCard } from '@/components/InventoryCard/index';
import { PurchaseImage } from '@/assets/images';
import { usePurchaseOrders } from './usePurchaseOrders';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';

export const PurchaseOrder = () => {
  const {
    AssetsInventoryPurchaseOrderData,
    isLoading,
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
    theme,
    setDelateRecord,
  } = usePurchaseOrders();

  return (
    <>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_RESPECTIVE_PURCHASE_ORDER,
        ]}
      >
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <>
            {AssetsInventoryPurchaseOrderData?.[0]?.purchaseOrdersDetails
              ?.length ? (
              AssetsInventoryPurchaseOrderData?.map(
                (singlePurchaseOrderList: any) =>
                  singlePurchaseOrderList?.purchaseOrdersDetails?.map(
                    (singlePurchaseOrder: any) =>
                      singlePurchaseOrder?.purchaseDetails?.map(
                        (purchaseOrder: any) => (
                          <div key={singlePurchaseOrder?._id}>
                            <InventoryCard
                              openDeleteModal={openDeleteModal}
                              setOpenDeleteModal={setOpenDeleteModal}
                              handleDelete={handleDelete}
                              setDelateRecord={setDelateRecord}
                              deletedRecordId={singlePurchaseOrder?._id}
                              heading={purchaseOrder?.itemName}
                              status={singlePurchaseOrder?.status}
                              key={singlePurchaseOrder?._id}
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
                                <Typography>
                                  {purchaseOrder?.costPerItem} $
                                </Typography>
                              </Box>
                            </InventoryCard>
                          </div>
                        ),
                      ),
                  ),
              )
            ) : (
              <NoData
                image={PurchaseImage}
                message={'No purchase order associated'}
              />
            )}
          </>
        )}
      </PermissionsGuard>
    </>
  );
};
