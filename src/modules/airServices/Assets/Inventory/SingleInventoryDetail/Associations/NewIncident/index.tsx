import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid, Box } from '@mui/material';
import { useNewIncident } from './useNewIncident';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

export const NewIncident = ({ openDrawer }: any) => {
  const {
    handleSubmit,
    onSubmit,
    methods,
    newIncidentFormFields,
    isLoading,
    isFetching,
    onClose,
  } = useNewIncident();
  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={onClose}
      title={'Create and Link a new Incident to this asset'}
      okText={'Create'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : (
        <Box mt={1}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {newIncidentFormFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      )}
    </CommonDrawer>
  );
};
