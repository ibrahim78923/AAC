import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { Box, Grid, InputAdornment } from '@mui/material';
import { useGiftCards } from './useGiftCards';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { LoadingButton } from '@mui/lab';
import ApiErrorState from '@/components/ApiErrorState';
import { PoundSignIcon } from '@/assets/icons';

export const GiftCards = () => {
  const {
    methods,
    handleSubmit,
    submitGiftCard,
    apiCallInProgress,
    showLoader,
    isError,
  } = useGiftCards();

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
      {showLoader ? (
        <SkeletonForm length={1} />
      ) : isError ? (
        <ApiErrorState />
      ) : (
        <FormProvider methods={methods} onSubmit={handleSubmit(submitGiftCard)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={7}>
              <RHFTextField
                name="giftCardMaxAmount"
                label="Maximum amount limit"
                placeholder="Enter maximum amount limit (e.g., 1000)"
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
          <Box minHeight={{ xs: '5vh', md: '50vh' }} />
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
            >
              Save
            </LoadingButton>
          </Box>
        </FormProvider>
      )}
    </>
  );
};
