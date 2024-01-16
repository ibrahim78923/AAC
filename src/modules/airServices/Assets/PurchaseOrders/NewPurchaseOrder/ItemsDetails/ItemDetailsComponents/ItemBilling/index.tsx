import { Box, Divider, Grid, Typography } from '@mui/material';
import { styles } from '../../ItemsDetails.style';
import { billingData } from '../../ItemsDetails.data';
import { RHFTextField } from '@/components/ReactHookForm';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const ItemBilling = ({ watch }: any) => {
  const { flexBetween, billingWrapper, billingLabel, billingValue } = styles();
  const items = watch(`purchaseDetails`);
  const subTotal = Number(watch(`subTotal`));
  const discount = Number(watch(`discount`));
  const taxRatio = Number(watch(`taxRatio`));
  const shipping = Number(watch(`shipping`));
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue(
      `subTotal`,
      items?.reduce((n: any, { total }: any) => n + Number(total), 0),
    );
  }, [items?.reduce((n: any, { total }: any) => n + Number(total), 0)]);
  useEffect(() => {
    //calculating total after tax and multiplying by subtotal of items
    let total = subTotal * (1 + taxRatio / 100);
    total = total - total * (discount / 100);
    setValue(`total`, total + shipping);
  }, [discount, taxRatio, shipping]);
  return (
    <Box
      sx={{
        ...flexBetween,
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      {billingData?.map((item: any) => {
        const totalItem = [
          billingData?.[0]?.name,
          billingData?.[billingData?.length - 1]?.name,
        ];
        return (
          <Grid
            key={item?.name}
            container
            xs={12}
            sm={6}
            md={5}
            lg={4}
            xl={2.5}
            sx={{
              ...flexBetween,
              ...billingWrapper,
            }}
          >
            {totalItem?.includes(item?.name) && (
              <Divider sx={{ width: '100%' }} />
            )}
            <Grid item>
              <Typography
                sx={{
                  ...billingLabel,
                  fontWeight: totalItem?.includes(item?.name) ? 600 : 400,
                  pt: totalItem?.includes(item?.name) ? 1 : 0,
                }}
              >
                {item?.label}
              </Typography>
            </Grid>
            <Grid item>
              {totalItem?.includes(item?.name) ? (
                <Typography sx={billingValue}>
                  {watch(item?.name)?.toFixed(2)}
                </Typography>
              ) : (
                <RHFTextField
                  key={item?.name}
                  name={item?.name}
                  type="number"
                  inputProps={{
                    max: item?.name === 'shipping' ? null : 100,
                    min: 0,
                    style: {
                      width: 50,
                      height: 1,
                    },
                  }}
                />
              )}
            </Grid>
            {totalItem?.includes(item?.name) && (
              <Divider sx={{ width: '100%', height: '10px' }} />
            )}
          </Grid>
        );
      })}
    </Box>
  );
};

export default ItemBilling;
