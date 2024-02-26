import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { useUpsertRelatedTicket } from './useUpsertRelatedTicket';

export const UpsertRelatedTicket = (props: any) => {
  const { isDrawerOpen, childTicketId } = props;
  const {
    handleSubmit,
    submitUpsertTicket,
    methods,
    isFetching,
    onClose,
    isLoading,
    upsertTicketFormFields,
    postChildTicketStatus,
    putChildTicketStatus,
    isError,
  } = useUpsertRelatedTicket(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose?.()}
      okText={!!childTicketId ? 'Update' : 'Add Child Ticket'}
      title={!!childTicketId ? 'Edit Child Ticket' : 'Add Child Ticket'}
      submitHandler={() => handleSubmit(submitUpsertTicket)()}
      isOk
      cancelText={'Cancel'}
      footer
      isLoading={
        postChildTicketStatus?.isLoading || putChildTicketStatus?.isLoading
      }
      isDisabled={
        isError ||
        postChildTicketStatus?.isLoading ||
        putChildTicketStatus?.isLoading
      }
    >
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : (
        <>
          {isError && (
            <Typography
              component="div"
              color="error.main"
              textAlign={'center'}
              variant="body3"
            >
              Something went wrong. Try again later
            </Typography>
          )}
          <Box mt={1}>
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(submitUpsertTicket)}
            >
              <Grid container spacing={2}>
                {upsertTicketFormFields?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={item?.id}>
                    <item.component
                      {...item?.componentProps}
                      size={'small'}
                      disabled={item?.componentProps?.disabled ?? isError}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormProvider>
          </Box>
        </>
      )}
      <br />
    </CommonDrawer>
  );
};
