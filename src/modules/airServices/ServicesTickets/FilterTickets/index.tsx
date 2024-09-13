import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useFilterTickets } from './useFilterTickets';

export const FilterTickets = () => {
  const {
    ticketsFilterFormFieldsData,
    methods,
    handleSubmit,
    submitTicketFilterForm,
    onClose,
    resetTicketFilterForm,
    isPortalOpen,
  } = useFilterTickets();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen as boolean}
        onClose={onClose}
        okText={'Apply'}
        title={'Filter'}
        submitHandler={handleSubmit(submitTicketFilterForm)}
        isOk
        cancelText={'Reset'}
        footer
        cancelBtnHandler={resetTicketFilterForm}
      >
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {ticketsFilterFormFieldsData?.map((form: any) => {
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
