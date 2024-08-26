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
import { AIR_SERVICES } from '@/constants';

export const EditTicketDetails = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    ticketDetailsFormFields,
    isLoading,
    isFetching,
    editTicketsDetailsStatus,
    form,
    getDynamicFieldsStatus,
    postAttachmentStatus,
    isError,
    getDynamicFormData,
    refetch,
    router,
  } = useEditTicketDetails();

  return (
    <Grid
      container
      justifyContent={'center'}
      display={'flex'}
      alignItems={'center'}
      flexDirection={'row'}
    >
      <Grid item xs={12} sx={{ mb: '2rem' }}>
        <Typography variant="h5">Properties</Typography>
      </Grid>
      {isLoading ||
      isFetching ||
      getDynamicFieldsStatus?.isLoading ||
      getDynamicFieldsStatus?.isFetching ? (
        <SkeletonForm />
      ) : getDynamicFieldsStatus?.isError || isError ? (
        <ApiErrorState
          canRefresh
          refresh={() => {
            refetch?.();
            getDynamicFormData?.();
          }}
        />
      ) : (
        <Grid item xs={12}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_TICKETS_TICKETS_DETAILS?.UPDATE_INFO_EDIT_TICKET_DETAILS,
              ]}
            >
              <Grid container spacing={4}>
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
                  variant={'outlined'}
                  type="button"
                  color="inherit"
                  disabled={
                    editTicketsDetailsStatus?.isLoading ||
                    postAttachmentStatus?.isLoading
                  }
                  onClick={() => router?.push(AIR_SERVICES?.TICKETS)}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  variant={'contained'}
                  type={'submit'}
                  sx={{ ml: 2 }}
                  loading={
                    editTicketsDetailsStatus?.isLoading ||
                    postAttachmentStatus?.isLoading
                  }
                >
                  Submit
                </LoadingButton>
              </Box>
            </PermissionsGuard>
          </FormProvider>
        </Grid>
      )}
    </Grid>
  );
};
