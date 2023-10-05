import { FormProvider } from '@/components/ReactHookForm';
import { Button, Grid, Box } from '@mui/material';
import { useTicketBulkUpdate } from './useTicketsBulkUpdate';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
export const TicketsBulkUpdate = (props: any) => {
  const { submitTicketBulkUpdateForm, to, setTo, handleSubmit, methods } =
    props;
  const {
    ticketsBulkUpdateFormFieldsData,
    theme,
    ticketsBulkUpdateToFormFieldsData,
  } = useTicketBulkUpdate(props);
  return (
    <>
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
        methods={methods}
        onSubmit={handleSubmit(submitTicketBulkUpdateForm)}
      >
        {to && (
          <>
            <Box
              padding={1.5}
              borderRadius={'.5rem'}
              style={{ backgroundColor: theme.palette.primary.light }}
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
                          ? form.componentProps.options.map((option: any) => (
                              <option key={option?.id} value={option?.value}>
                                {option?.label}
                              </option>
                            ))
                          : form?.heading
                          ? form?.heading
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
                    : form?.heading
                    ? form?.heading
                    : null}
                </form.component>
              </Grid>
            );
          })}
        </Grid>
      </FormProvider>
    </>
  );
};
