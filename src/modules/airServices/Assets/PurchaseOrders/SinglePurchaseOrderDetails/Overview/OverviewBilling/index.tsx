import { Box, Divider, Grid, Typography, TextField } from '@mui/material';
import { modelBillingData } from './OverviewBilling.data';
import { styles } from './OverviewBilling.style';

const OverviewBilling = () => {
  return (
    <Box
      sx={{
        ...styles?.flexBetween,
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      {modelBillingData?.map((item: any) => {
        const totalItem = [
          modelBillingData?.[0]?.label,
          modelBillingData?.[modelBillingData?.length - 1]?.label,
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
            <Grid item>
              {totalItem?.includes(item?.label) ? (
                <Typography sx={styles?.billingValue}>{item?.value}</Typography>
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
