import NoData from '@/components/NoData';
import { Grid, Typography, useTheme } from '@mui/material';
import NoPurchaseOrderFound from '@/assets/images/modules/LogitechMouse/purchase-orders.png';
import { purchaseOrderData } from './PurchaseOrder.data';
import { Card } from '@/modules/airServices/common/Card';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './PurchaseOrder.style';

export const PurchaseOrder = () => {
  const theme: any = useTheme();
  return (
    <Grid container>
      <Grid item xs={12} md={12} xl={12}>
        {!!purchaseOrderData?.length ? (
          purchaseOrderData?.map((singlePurchaseOrder: any) => (
            <Card
              heading={singlePurchaseOrder.heading}
              status={singlePurchaseOrder.status}
              key={uuidv4()}
              show={true}
            >
              <Typography>
                <span style={styles.spanStyle(theme)}>Cost:</span>
                {singlePurchaseOrder.cost}
              </Typography>
            </Card>
          ))
        ) : (
          <NoData
            image={NoPurchaseOrderFound}
            message={'No purchase order associated'}
          />
        )}
      </Grid>
    </Grid>
  );
};
