import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography } from '@mui/material';

import { useDetailsViewPropertiesSection } from './useDetailsViewPropertiesSection';
import DetailViewTimeEntries from '../DetailViewTimeEntries';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';
import { LoadingButton } from '@mui/lab';

const DetailsViewPropertiesSection = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    ticketDetailsFormFields,
    isLoading,
    isFetching,
    data,
    putTicketStatus,
  } = useDetailsViewPropertiesSection();
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
                <DetailViewTimeEntries data={data} />
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
                    disabled={putTicketStatus?.isLoading}
                  >
                    Cancel
                  </LoadingButton>
                  <LoadingButton
                    variant={'contained'}
                    type={'submit'}
                    sx={{ ml: 2 }}
                    loading={putTicketStatus?.isLoading}
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

export default DetailsViewPropertiesSection;
