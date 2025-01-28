import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { Box, InputAdornment } from '@mui/material';
import { useGiftCards } from './useGiftCards';
import { LoadingButton } from '@mui/lab';
import { PoundSignIcon } from '@/assets/icons';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const GiftCards = () => {
  const {
    methods,
    handleSubmit,
    submitGiftCard,
    apiCallInProgress,
    showLoader,
    isError,
    reset,
    refetch,
  } = useGiftCards();

  return (
    <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageTitledHeader title="Gift cards" />
      <Box bgcolor="primary.lighter" p={1} borderRadius={2} mb={3}>
        <PageTitledHeader
          title="General"
          titleVariant="h6"
          outerMarginBottom={0.1}
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <ApiRequestFlow
          showSkeleton={showLoader}
          hasError={isError}
          refreshApi={refetch}
        >
          <FormProvider methods={methods}>
            <ContainerGrid spacing={1}>
              <CustomGrid md={7}>
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
              </CustomGrid>
            </ContainerGrid>
          </FormProvider>
        </ApiRequestFlow>
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
          onClick={reset}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={apiCallInProgress}
          onClick={handleSubmit(submitGiftCard)}
        >
          Save
        </LoadingButton>
      </Box>
    </Box>
  );
};
