import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { Box, Grid, InputAdornment } from '@mui/material';
import { useLoyalty } from './useLoyalty';
import { LoadingButton } from '@mui/lab';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { PoundSignIcon } from '@/assets/icons';

export const Loyalty = () => {
  const {
    methods,
    handleSubmit,
    submitLoyalty,
    apiCallInProgress,
    showLoader,
    isError,
  } = useLoyalty();

  return (
    <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageTitledHeader title="Loyalty" />
      <Box bgcolor="primary.lighter" p={1} borderRadius={2} mb={3}>
        <PageTitledHeader
          title="General"
          titleVariant="h6"
          outerMarginBottom={0.1}
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {showLoader ? (
          <SkeletonForm length={2} />
        ) : isError ? (
          <ApiErrorState />
        ) : (
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={8}>
                <RHFTextField
                  name="maxPointLimit"
                  label="Maximum points limit"
                  placeholder="Enter maximum points limit (e.g., 1000)"
                  size="small"
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <RHFTextField
                  name="exchangeRate"
                  label="Exchange rate per point"
                  placeholder="Enter exchange rate per point (e.g., 1)"
                  size="small"
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PoundSignIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </FormProvider>
        )}
      </Box>
      <Box
        sx={{
          width: '100%',
          textAlign: 'right',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 2,
        }}
      >
        <LoadingButton
          type="button"
          variant="outlined"
          color="inherit"
          disabled={apiCallInProgress}
          onClick={() => methods?.reset()}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={apiCallInProgress}
          onClick={handleSubmit(submitLoyalty)}
        >
          Save
        </LoadingButton>
      </Box>
    </Box>
  );
};
