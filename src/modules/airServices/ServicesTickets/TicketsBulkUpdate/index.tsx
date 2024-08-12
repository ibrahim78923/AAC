import { FormProvider } from '@/components/ReactHookForm';
import { Button, Grid, Box } from '@mui/material';
import { useTicketBulkUpdate } from './useTicketsBulkUpdate';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CommonDrawer from '@/components/CommonDrawer';
import { TicketActionComponentPropsI } from '../TicketsLists/TicketsLists.interface';

export const TicketsBulkUpdate = (props: TicketActionComponentPropsI) => {
  const { isPortalOpen } = props;
  const {
    ticketsBulkUpdateFormFields,
    theme,
    ticketsBulkUpdateAddReplyFormFieldsData,
    methodsBulkUpdateForm,
    handleSubmit,
    isReplyAdded,
    setIsReplyAdded,
    onClose,
    submitTicketBulkUpdateForm,
    patchBulkUpdateTicketsStatus,
  }: any = useTicketBulkUpdate(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen}
        onClose={() => onClose?.()}
        okText={'Update'}
        title={'Bulk Update'}
        submitHandler={() => handleSubmit(submitTicketBulkUpdateForm)()}
        isOk
        cancelText={'Cancel'}
        footer
        isLoading={patchBulkUpdateTicketsStatus?.isLoading}
        isDisabled={patchBulkUpdateTicketsStatus?.isLoading}
        disabledCancelBtn={patchBulkUpdateTicketsStatus?.isLoading}
      >
        {!isReplyAdded && (
          <Button
            variant="text"
            sx={{ backgroundColor: 'primary.lighter' }}
            onClick={() => setIsReplyAdded(true)}
            startIcon={<AddCircleIcon />}
          >
            Add Reply
          </Button>
        )}
        <br />
        <FormProvider
          methods={methodsBulkUpdateForm}
          onSubmit={handleSubmit(submitTicketBulkUpdateForm)}
        >
          {isReplyAdded && (
            <>
              <Box
                padding={1.25}
                borderRadius={2}
                sx={{ backgroundColor: theme?.palette?.primary?.lighter }}
              >
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Box sx={{ flex: 1 }}></Box>
                  <Box
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setIsReplyAdded(false)}
                  >
                    <CloseIcon />
                  </Box>
                </Box>
                <Grid container spacing={1.5}>
                  {ticketsBulkUpdateAddReplyFormFieldsData?.map((form: any) => {
                    return (
                      <Grid item xs={12} key={form?.id}>
                        <form.component
                          {...form?.componentProps}
                          size="small"
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </>
          )}
          <br />
          <Grid container spacing={1.5}>
            {ticketsBulkUpdateFormFields?.map((form: any) => {
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
