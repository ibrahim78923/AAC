import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid, Box } from '@mui/material';
import { useNewIncident } from './useNewIncident';

export const NewIncident = (props: any) => {
  const { openDrawer } = props;
  const {
    handleSubmit,
    onSubmit,
    methods,
    newIncidentFormFields,
    onClose,
    postTicketStatus,
    existingIncidentStatus,
  } = useNewIncident(props);

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={onClose}
      title={'Create and Link a new Incident to this asset'}
      okText={'Create'}
      isOk
      cancelText={'Cancel'}
      footer
      isLoading={
        postTicketStatus?.isLoading || existingIncidentStatus?.isLoading
      }
      isDisabled={
        postTicketStatus?.isLoading || existingIncidentStatus?.isLoading
      }
      disabledCancelBtn={
        postTicketStatus?.isLoading || existingIncidentStatus?.isLoading
      }
      submitHandler={handleSubmit(onSubmit)}
    >
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
    </CommonDrawer>
  );
};
