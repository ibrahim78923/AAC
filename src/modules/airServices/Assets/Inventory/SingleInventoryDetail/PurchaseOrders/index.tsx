import NoData from '@/components/NoData';
import { Box, Typography, useTheme } from '@mui/material';
import NoPurchaseOrderFound from '@/assets/images/modules/LogitechMouse/purchase-orders.png';
import { purchaseOrderData } from './PurchaseOrder.data';
import { InventoryCard } from '@/components/InventoryCard/index';
import { v4 as uuidv4 } from 'uuid';

export const PurchaseOrder = () => {
  const theme: any = useTheme();
  return (
    <>
      {!!purchaseOrderData?.length ? (
        purchaseOrderData?.map((singlePurchaseOrder: any) => (
          <InventoryCard
            heading={singlePurchaseOrder.heading}
            status={singlePurchaseOrder.status}
            key={uuidv4()}
            showChild
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyItems={'center'}
              gap={'.3rem'}
            >
              <Typography color={theme?.palette?.grey[900]}>Cost:</Typography>
              <Typography>{singlePurchaseOrder.cost}</Typography>
            </Box>
          </InventoryCard>
        ))
      ) : (
        <NoData
          image={NoPurchaseOrderFound}
          message={'No purchase order associated'}
        />
      )}
    </>
  );
};
