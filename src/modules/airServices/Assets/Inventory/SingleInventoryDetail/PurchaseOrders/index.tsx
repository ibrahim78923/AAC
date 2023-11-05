import NoData from '@/components/NoData';
import { Box, Typography, useTheme } from '@mui/material';
import { purchaseOrderData } from './PurchaseOrder.data';
import { InventoryCard } from '@/components/InventoryCard/index';
import { v4 as uuidv4 } from 'uuid';
import { purchaseImage } from '@/assets/images';

export const PurchaseOrder = () => {
  const theme: any = useTheme();
  return (
    <>
      {!!purchaseOrderData?.length ? (
        purchaseOrderData?.map((singlePurchaseOrder: any) => (
          <div key={uuidv4()}>
            <InventoryCard
              heading={singlePurchaseOrder?.heading}
              status={singlePurchaseOrder?.status}
              key={uuidv4()}
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
                <Typography>{singlePurchaseOrder?.cost}</Typography>
              </Box>
            </InventoryCard>
          </div>
        ))
      ) : (
        <NoData
          image={purchaseImage}
          message={'No purchase order associated'}
        />
      )}
    </>
  );
};
