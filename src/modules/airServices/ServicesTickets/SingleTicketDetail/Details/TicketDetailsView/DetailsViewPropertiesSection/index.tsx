import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Grid, Typography } from '@mui/material';

import { useDetailsViewPropertiesSection } from './useDetailsViewPropertiesSection';
import DetailViewTimeEntries from '../DetailViewTimeEntries';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';

const DetailsViewPropertiesSection = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    ticketDetailsFormFields,
    isLoading,
    isFetching,
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
                permissions={[
                  AIR_SERVICES_TICKETS_TICKETS_DETAILS?.VIEW_TIME_ENTRIES_DETAILS,
                  AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_TIME_ENTRIES_DETAILS,
                ]}
              >
                <DetailViewTimeEntries />
              </PermissionsGuard>
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_TICKETS_TICKETS_DETAILS?.UPDATE_INFO_EDIT_TICKET_DETAILS,
                ]}
              >
                <Box textAlign={'end'} p={2}>
                  <Button variant={'outlined'}>Cancel</Button>
                  <Button variant={'contained'} type={'submit'} sx={{ ml: 2 }}>
                    Submit
                  </Button>
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
