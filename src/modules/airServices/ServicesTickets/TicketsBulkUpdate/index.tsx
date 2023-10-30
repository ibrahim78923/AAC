import { FormProvider } from '@/components/ReactHookForm';
import { Button, Grid, Box } from '@mui/material';
import { useTicketBulkUpdate } from './useTicketsBulkUpdate';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CommonDrawer from '@/components/CommonDrawer';
export const TicketsBulkUpdate = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const {
    ticketsBulkUpdateFormFieldsData,
    // router,
    theme,
    ticketsBulkUpdateToFormFieldsData,
    methodsBulkUpdateForm,
    handleSubmit,
    to,
    setTo,
    onClose,
    submitTicketBulkUpdateForm,
  } = useTicketBulkUpdate(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        // onClose={
        //   drawerComponent?.[router?.query?.tableAction as string]
        //     ?.resetHandler ||
        //   (() => {
        //     router?.push({ pathname: router?.pathname });
        //     setIsDrawerOpen?.(false);
        //   })
        // }
        onClose={() => onClose?.()}
        okText={'Submit'}
        title={'Tickets Bulk Update'}
        submitHandler={() => handleSubmit(submitTicketBulkUpdateForm)()}
        isOk
        cancelText={'Cancel'}
        footer
      >
        <br />
        {!to && (
          <Button
            variant="outlined"
            onClick={() => setTo(true)}
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
          {to && (
            <>
              <Box
                padding={1.5}
                borderRadius={'.5rem'}
                style={{ backgroundColor: theme?.palette?.primary?.light }}
              >
                <Box display={'flex'} justifyContent={'space-between'}>
                  <div style={{ flex: 1 }}></div>
                  <CloseIcon onClick={() => setTo(false)} />
                </Box>
                <Grid container marginBottom={3} spacing={2}>
                  {ticketsBulkUpdateToFormFieldsData?.map((form: any) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        // md={12}
                        key={form.id}
                      >
                        <form.component {...form.componentProps} size="medium">
                          {form?.componentProps?.select
                            ? form?.componentProps?.options?.map(
                                (option: any) => (
                                  <option
                                    key={option?.id}
                                    value={option?.value}
                                  >
                                    {option?.label}
                                  </option>
                                ),
                              )
                            : null}
                        </form.component>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
              <br />
            </>
          )}
          <Grid container spacing={5}>
            {ticketsBulkUpdateFormFieldsData?.map((form: any) => {
              return (
                <Grid
                  item
                  xs={12}
                  //   md={form?.gridLength}
                  key={form.id}
                >
                  <form.component {...form.componentProps} size="medium">
                    {form?.componentProps?.select
                      ? form.componentProps.options.map((option: any) => (
                          <option key={option?.id} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </form.component>
                </Grid>
              );
            })}
          </Grid>
        </FormProvider>
      </CommonDrawer>
    </>
  );
};
