import { FormProvider } from '@/components/ReactHookForm';
import { Button, Grid, Box } from '@mui/material';
import { useTicketBulkUpdate } from './useTicketsBulkUpdate';
import { AddCircle, Close } from '@mui/icons-material';
import CommonDrawer from '@/components/CommonDrawer';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const TicketsBulkUpdate = () => {
  const {
    ticketsBulkUpdateFormFields,
    theme,
    ticketsBulkUpdateAddReplyFormFieldsData,
    methods,
    handleSubmit,
    isReplyAdded,
    setIsReplyAdded,
    onClose,
    submitTicketBulkUpdateForm,
    isPortalOpen,
    apiCallInProgress,
  }: any = useTicketBulkUpdate();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen as boolean}
        onClose={onClose}
        okText={'Update'}
        title={'Bulk Update'}
        submitHandler={handleSubmit(submitTicketBulkUpdateForm)}
        isOk
        footer
        isLoading={apiCallInProgress}
        isDisabled={apiCallInProgress}
        disabledCancelBtn={apiCallInProgress}
      >
        {!isReplyAdded && (
          <Button
            variant="text"
            sx={{ backgroundColor: 'primary.lighter' }}
            onClick={() => setIsReplyAdded(true)}
            startIcon={<AddCircle />}
            className="small"
          >
            Add Reply
          </Button>
        )}
        <br />
        <FormProvider methods={methods}>
          {isReplyAdded && (
            <Box
              padding={1.25}
              borderRadius={2}
              sx={{ backgroundColor: theme?.palette?.primary?.lighter }}
            >
              <Box textAlign={'right'}>
                <Close
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setIsReplyAdded(false)}
                />
              </Box>
              <Grid container spacing={1.5}>
                {ticketsBulkUpdateAddReplyFormFieldsData?.map(
                  (form: ReactHookFormFieldsI) => {
                    return (
                      <Grid item xs={12} key={form?.id}>
                        <form.component
                          {...form?.componentProps}
                          size="small"
                        />
                      </Grid>
                    );
                  },
                )}
              </Grid>
            </Box>
          )}
          <br />
          <Grid container spacing={1.5}>
            {ticketsBulkUpdateFormFields?.map((form: ReactHookFormFieldsI) => {
              return (
                <Grid item xs={12} key={form?.id}>
                  <form.component {...form?.componentProps} size="small" />
                </Grid>
              );
            })}
          </Grid>
        </FormProvider>
      </CommonDrawer>
    </>
  );
};
