import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
// import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { useTicketFilter } from './useTicketsFilter';
import CommonDrawer from '@/components/CommonDrawer';

export const TicketsFilter = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    ticketsFilterFormFieldsData,
    methods,
    handleSubmit,
    submitTicketFilterForm,
    // resetTicketFilterForm,
    onClose,
  } = useTicketFilter(props);

  // if ('isLoading') return <SkeletonForm />;
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => onClose?.()}
        okText={'Submit'}
        title={'Tickets Bulk Update'}
        submitHandler={() => handleSubmit(submitTicketFilterForm)()}
        isOk
        cancelText={'Cancel'}
        footer
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitTicketFilterForm)}
        >
          <Grid container rowSpacing={2.6} columnSpacing={2} mt={-1}>
            {ticketsFilterFormFieldsData?.map((form: any) => {
              return (
                <Grid item xs={12} md={form?.gridLength} key={form.id}>
                  <form.component {...form.componentProps} size="small">
                    {form?.componentProps?.select
                      ? form?.componentProps?.options.map((option: any) => (
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
