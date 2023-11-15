import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useTicketsFilter } from './useTicketsFilter';
import CommonDrawer from '@/components/CommonDrawer';
import { v4 as uuidv4 } from 'uuid';

export const TicketsFilter = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    ticketsFilterFormFieldsData,
    methods,
    handleSubmit,
    submitTicketFilterForm,
    onClose,
  } = useTicketsFilter(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => onClose?.()}
        okText={'Submit'}
        title={'Filter'}
        submitHandler={() => handleSubmit(submitTicketFilterForm)()}
        isOk
        cancelText={'Reset'}
        footer
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitTicketFilterForm)}
        >
          <Grid container rowSpacing={2.6} columnSpacing={2} mt={-1}>
            {ticketsFilterFormFieldsData?.map((form: any) => {
              return (
                <Grid item xs={12} md={form?.gridLength} key={uuidv4()}>
                  <form.component {...form?.componentProps} size="small">
                    {form?.componentProps?.select
                      ? form?.componentProps?.options?.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
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
