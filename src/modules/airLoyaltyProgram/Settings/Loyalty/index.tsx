import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider } from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import { useLoyalty } from './useLoyalty';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { loyaltySettingsFormFields } from './Loyalty.data';
import { FormGrid } from '@/components/Grids/FormGrid';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

export const Loyalty = () => {
  const {
    methods,
    handleSubmit,
    submitLoyalty,
    apiCallInProgress,
    showLoader,
    isError,
    reset,
    getLoyaltySettings,
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
        <ApiRequestFlow
          showSkeleton={showLoader}
          hasError={isError}
          refreshApi={getLoyaltySettings}
        >
          <FormProvider methods={methods}>
            <FormGrid formFieldsList={loyaltySettingsFormFields} />
          </FormProvider>
        </ApiRequestFlow>
      </Box>
      <ActionsLoadingButton
        submitButtonText={GENERIC_UPSERT_FORM_CONSTANT?.SAVE}
        showSubmitLoader={apiCallInProgress}
        handleCancelButton={reset}
        handleSubmitButton={handleSubmit(submitLoyalty)}
      />
    </Box>
  );
};
