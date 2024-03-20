import { Box, Divider, Grid, Typography } from '@mui/material';
import { modalBillingData } from './OverviewBilling.data';
import { styles } from './OverviewBilling.style';

const OverviewBilling = ({
  purchaseOrderDetailData,
  purchaseOrderData,
  rowData,
}: any) => {
  const purchaseOrderDetail = purchaseOrderDetailData?.[0];
  const subTotal = purchaseOrderData?.subTotal || 0;
  const discount = purchaseOrderData?.discount || 0;
  const taxRate = purchaseOrderDetail?.taxRate || 0;
  const shipping = purchaseOrderData?.shipping || 0;
  const total =
    subTotal -
    (subTotal * discount) / 100 +
    (subTotal * taxRate) / 100 +
    shipping;
  return (
    <Box
      sx={{
        ...styles?.flexBetween,
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      {modalBillingData({
        purchaseOrderDetail,
        purchaseOrderData,
        rowData,
        total,
        purchaseOrderDetailData,
      })?.map((item: any) => {
        const totalItem = [
          purchaseOrderDetail?.[0]?.label,
          purchaseOrderDetail?.[purchaseOrderDetail?.length - 1]?.label,
        ];
        return (
          <Grid
            key={item?.label}
            container
            xs={12}
            sm={6}
            md={5}
            lg={4}
            xl={2.5}
            sx={{
              ...styles?.flexBetween,
              ...styles?.billingWrapper,
            }}
          >
            {totalItem?.includes(item?.label) && (
              <Divider sx={{ width: '100%' }} />
            )}
            <Grid item>
              <Typography
                sx={{
                  ...styles?.billingLabel,
                  fontWeight: totalItem?.includes(item?.label) ? 600 : 400,
                  pt: totalItem?.includes(item?.label) ? 1 : 0,
                }}
              >
                {item?.label}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                width: 70,
                height: 44,
                border: '1px solid black',
                padding: '8px',
                mt: 1,
                borderRadius: 1,
                textAlign: 'center',
              }}
              key={item?.value}
            >
              {totalItem?.includes(item?.label) ? (
                <Typography sx={styles?.billingValue}>{item?.value}</Typography>
              ) : (
                <Typography>{item?.value}</Typography>
              )}
            </Grid>
            {totalItem?.includes(item?.label) && (
              <Divider sx={{ width: '100%', height: '0.625rem' }} />
            )}
          </Grid>
        );
      })}
    </Box>
  );
};

export default OverviewBilling;
