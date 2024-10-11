import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { Box, Grid, InputAdornment } from '@mui/material';
import { useGiftCards } from './useGiftCards';
import { Paid } from '@mui/icons-material';

export const GiftCards = () => {
  const { methods } = useGiftCards();

  return (
    <>
      <PageTitledHeader title="Gift cards" />
      <Box bgcolor="primary.lighter" p={1} borderRadius={2} mb={1}>
        <PageTitledHeader
          title="General"
          titleVariant="h6"
          outerMarginBottom={0.1}
        />
      </Box>
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={7}>
            <RHFTextField
              name="maxAmountLimit"
              label="Maximum amount limit"
              placeholder="Enter maximum amount limit (e.g., 1000)"
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
