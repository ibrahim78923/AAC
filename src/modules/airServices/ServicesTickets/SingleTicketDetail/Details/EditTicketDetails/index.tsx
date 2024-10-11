import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography } from '@mui/material';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { LoadingButton } from '@mui/lab';
import { useEditTicketDetails } from './useEditTicketDetails';
import ApiErrorState from '@/components/ApiErrorState';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

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
      {getApiCallInProgress ? (
        <SkeletonForm gridSize={{ md: 4 }} length={8} />
      ) : getApiCallHasError ? (
        <ApiErrorState
          canRefresh
          refresh={() => {
            refetch?.();
            getDynamicFormData?.();
          }}
        />
      ) : (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <PermissionsGuard permissions={[UPDATE_INFO_EDIT_TICKET_DETAILS]}>
            <Grid container spacing={2}>
              {ticketDetailsFormFields?.map((item: ReactHookFormFieldsI) => (
                <Grid item xs={12} md={4} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
              {form?.map((item: ReactHookFormFieldsI) => (
                <Grid item xs={12} md={4} key={item?.id}>
                  {componentMap[item?.component] &&
                    createElement(componentMap[item?.component], {
                      ...item?.componentProps,
                      name: item?.componentProps?.label,
                      size: 'small',
                    })}
                </Grid>
              ))}
            </Grid>
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
      )}
    </Box>
  );
};
