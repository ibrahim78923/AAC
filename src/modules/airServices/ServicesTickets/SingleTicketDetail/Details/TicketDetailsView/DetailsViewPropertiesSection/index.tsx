import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Grid, Typography } from '@mui/material';

import { useDetailsViewPropertiesSection } from './useDetailsViewPropertiesSection';
import DetailViewTimeEntries from '../DetailViewTimeEntries';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

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
              <Grid container spacing={4}>
                {ticketDetailsFormFields?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={item?.id}>
                    <item.component {...item?.componentProps} size={'small'} />
                  </Grid>
                ))}
              </Grid>
              <DetailViewTimeEntries />
              <Box textAlign={'end'} p={2}>
                <Button variant={'outlined'}>Cancel</Button>
                <Button variant={'contained'} type={'submit'} sx={{ ml: 2 }}>
                  Submit
                </Button>
              </Box>
            </FormProvider>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default DetailsViewPropertiesSection;
