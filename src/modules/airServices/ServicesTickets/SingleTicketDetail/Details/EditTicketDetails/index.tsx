import { FormProvider } from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { LoadingButton } from '@mui/lab';
import { useEditTicketDetails } from './useEditTicketDetails';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';
import { DynamicForm } from '@/components/DynamicForm';

const { UPDATE_INFO_EDIT_TICKET_DETAILS } =
  AIR_SERVICES_TICKETS_TICKETS_DETAILS ?? {};

export const EditTicketDetails = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    ticketDetailsFormFields,
    form,
    getDynamicFormData,
    refetch,
    ticketPostApiInProgress,
    getApiCallInProgress,
    moveToTicket,
    getApiCallHasError,
  } = useEditTicketDetails();

  return (
    <Box>
      <Typography variant="h5" mb={2} color="slateBlue.main">
        Properties
      </Typography>
      <ApiRequestFlow
        showSkeleton={getApiCallInProgress}
        hasError={getApiCallHasError}
        refreshApi={() => {
          refetch?.();
          getDynamicFormData?.();
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <PermissionsGuard permissions={[UPDATE_INFO_EDIT_TICKET_DETAILS]}>
            <FormGrid formFieldsList={ticketDetailsFormFields} md={4}>
              <DynamicForm dynamicFormFieldsList={form} md={4} />
            </FormGrid>
            <Box textAlign={'end'} p={2}>
              <LoadingButton
                className="small"
                variant={'outlined'}
                type="button"
                color="inherit"
                disabled={ticketPostApiInProgress}
                onClick={moveToTicket}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                className="small"
                variant={'contained'}
                type={'submit'}
                sx={{ ml: 2 }}
                loading={ticketPostApiInProgress}
              >
                Submit
              </LoadingButton>
            </Box>
          </PermissionsGuard>
        </FormProvider>
      </ApiRequestFlow>
    </Box>
  );
};
