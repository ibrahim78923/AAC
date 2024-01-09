import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { useUpsertTicket } from './useUpsertTicket';

export const UpsertTicket = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    handleSubmit,
    submitUpsertTicket,
    methods,
    isFetching,
    onClose,
    isLoading,
    ticketId,
    upsertTicketFormFields,
  } = useUpsertTicket(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose?.()}
      okText={!!ticketId ? 'Update' : 'Submit'}
      title={!!ticketId ? 'Edit Ticket' : 'Create Ticket'}
      submitHandler={() => handleSubmit(submitUpsertTicket)()}
      isOk
      cancelText={'Cancel'}
      footer
    >
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : (
        <Box mt={1}>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(submitUpsertTicket)}
          >
            <Grid container spacing={2}>
              {upsertTicketFormFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      )}
      <br />
    </CommonDrawer>
  );
};
