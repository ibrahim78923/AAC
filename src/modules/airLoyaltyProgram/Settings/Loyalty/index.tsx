import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { Box, Grid, InputAdornment } from '@mui/material';
import { useLoyalty } from './useLoyalty';
import { Paid } from '@mui/icons-material';

export const Loyalty = () => {
  const { methods } = useLoyalty();

  return (
    <>
      <PageTitledHeader title="Loyalty" />
      <Box bgcolor="primary.lighter" p={1} borderRadius={2} mb={1}>
        <PageTitledHeader
          title="General"
          titleVariant="h6"
          outerMarginBottom={0.1}
        />
      </Box>
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            <RHFTextField
              name="maxPointsLimit"
              label="Maximum points limit"
              placeholder="Enter maximum points limit (e.g., 1000)"
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <RHFTextField
              name="exchangeRate"
              label="Exchange rate per point"
              placeholder="Enter exchange rate per point (e.g., 1)"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Paid color="secondary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};
