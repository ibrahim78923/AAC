import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useTicketsFilter } from './useTicketsFilter';
import CommonDrawer from '@/components/CommonDrawer';

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
        okText={'Apply'}
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
          <Grid container spacing={1}>
            {ticketsFilterFormFieldsData?.map((form: any) => {
              return (
                <Grid item xs={12} md={form?.gridLength} key={form?.id}>
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
