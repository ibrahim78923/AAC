import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
// import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { useTicketFilter } from './useTicketsFilter';

export const TicketsFilter = (props: any) => {
  const { methods, handleSubmit, submitTicketFilterForm } = props;
  const { ticketsFilterFormFieldsData } = useTicketFilter();

  // if ('isLoading') return <SkeletonForm />;
  return (
    <>
      <br />
      <br />
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submitTicketFilterForm)}
      >
        <Grid container spacing={5}>
          {ticketsFilterFormFieldsData?.map((form: any) => {
            return (
              <Grid
                item
                xs={12}
                // md={form?.gridLength}
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
