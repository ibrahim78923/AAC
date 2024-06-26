import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography } from '@mui/material';

import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';
import { LoadingButton } from '@mui/lab';
import { useEditTicketDetails } from './useEditTicketDetails';

import { TimeEntries } from '../TimeEntries';
export const EditTicketDetails = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    ticketDetailsFormFields,
    isLoading,
    isFetching,
    data,
    editTicketsDetailsStatus,
  } = useEditTicketDetails();

  return (
    <>
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
        {isLoading || isFetching ? (
          <SkeletonForm />
        ) : (
          <Grid item xs={12}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_TICKETS_TICKETS_DETAILS?.UPDATE_INFO_EDIT_TICKET_DETAILS,
                ]}
              >
                <Grid container spacing={4}>
                  {ticketDetailsFormFields?.map((item: any) => (
                    <Grid item xs={12} md={item?.md} key={item?.id}>
                      <item.component
                        {...item?.componentProps}
                        size={'small'}
                      />
                    </Grid>
                  ))}
                </Grid>
              </PermissionsGuard>
              <PermissionsGuard
                permissions={
                  Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_TIME_ENTRIES
                }
              >
                <br />
                <TimeEntries data={data} />
              </PermissionsGuard>
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_TICKETS_TICKETS_DETAILS?.UPDATE_INFO_EDIT_TICKET_DETAILS,
                ]}
              >
                <Box textAlign={'end'} p={2}>
                  <LoadingButton
                    variant={'outlined'}
                    color="inherit"
                    onClick={() => methods?.reset()}
                    disabled={editTicketsDetailsStatus?.isLoading}
                  >
                    Cancel
                  </LoadingButton>
                  <LoadingButton
                    variant={'contained'}
                    type={'submit'}
                    sx={{ ml: 2 }}
                    loading={editTicketsDetailsStatus?.isLoading}
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </PermissionsGuard>
            </FormProvider>
          </Grid>
        )}
      </Grid>
    </>
  );
};
