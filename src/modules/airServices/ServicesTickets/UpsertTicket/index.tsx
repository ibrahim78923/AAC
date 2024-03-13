import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { useUpsertTicket } from './useUpsertTicket';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';

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
    putTicketStatus,
    postTicketStatus,
    isError,
    setHasAttachment,
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
      isLoading={putTicketStatus?.isLoading || putTicketStatus?.isLoading}
      isDisabled={
        isError || postTicketStatus?.isLoading || postTicketStatus?.isLoading
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
              <br />

              {!!ticketId && (
                <>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    color="slateBlue.main"
                    mb={2}
                  >
                    {' '}
                    Attachments{' '}
                  </Typography>
                  <Box maxHeight={'20vh'}>
                    <Attachments
                      recordId={ticketId}
                      permissionKey={[
                        AIR_SERVICES_TICKETS_TICKETS_DETAILS?.UPDATE_INFO_EDIT_TICKET_DETAILS,
                      ]}
                      hasAttachments={setHasAttachment}
                    />
                  </Box>
                </>
              )}
            </FormProvider>
          </Box>
        </>
      )}
      <br />
    </CommonDrawer>
  );
};
