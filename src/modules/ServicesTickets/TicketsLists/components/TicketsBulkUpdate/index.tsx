import { FormProvider } from '@/components/ReactHookForm';
import { Button, Grid } from '@mui/material';
import { useTicketBulkUpdate } from './useTicketsBulkUpdate';
import CloseIcon from '@mui/icons-material/Close';
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
        <Button variant="contained" onClick={() => setTo(true)}>
          Do More
        </Button>
      )}
      <br />
      <br />
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submitTicketBulkUpdateForm)}
      >
        {to && (
          <Grid
            container
            marginBottom={3}
            spacing={2}
            padding={1}
            borderRadius={'.5rem'}
            style={{ backgroundColor: theme.palette.primary.light }}
          >
            <div onClick={() => setTo(false)}>
              <CloseIcon style={{ float: 'right' }} />
            </div>
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
