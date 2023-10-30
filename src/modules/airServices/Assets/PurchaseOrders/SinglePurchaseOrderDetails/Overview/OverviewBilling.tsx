import { Box, Divider, Grid, Typography, TextField } from '@mui/material';
import { ModelBillingData } from './Overview.data';
import { styles } from './Overview.style';

const OverviewBilling = () => {
  const { flexBetween, billingWrapper, billingLabel, billingValue } = styles();
  return (
    <Box
      sx={{
        ...flexBetween,
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      {ModelBillingData?.map((item: any) => {
        const totalItem = [
          ModelBillingData[0]?.label,
          ModelBillingData[ModelBillingData?.length - 1]?.label,
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
              ...flexBetween,
              ...billingWrapper,
            }}
          >
            {totalItem?.includes(item?.label) && (
              <Divider sx={{ width: '100%' }} />
            )}
            <Grid item>
              <Typography
                sx={{
                  ...billingLabel,
                  fontWeight: totalItem?.includes(item?.label) ? 600 : 400,
                  pt: totalItem?.includes(item?.label) ? 1 : 0,
                }}
              >
                {item?.label}
              </Typography>
            </Grid>
            <Grid item>
              {totalItem?.includes(item?.label) ? (
                <Typography sx={billingValue}>{item?.value}</Typography>
              ) : (
                <TextField
                  key={item?.value}
                  name={item?.value}
                  value={item?.value}
                  type={item?.value === 'description' ? 'text' : 'number'}
                  inputProps={{
                    style: {
                      width: 50,
                      height: 1,
                    },
                  }}
                />
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
