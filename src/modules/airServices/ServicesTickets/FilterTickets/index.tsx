import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useFilterTickets } from './useFilterTickets';
import { TicketActionComponentPropsI } from '../TicketsLists/TicketsLists.interface';

export const FilterTickets = (props: TicketActionComponentPropsI) => {
  const { isPortalOpen } = props;
  const {
    ticketsFilterFormFieldsData,
    methods,
    handleSubmit,
    submitTicketFilterForm,
    onClose,
    resetTicketFilterForm,
  } = useFilterTickets(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen}
        onClose={() => onClose?.()}
        okText={'Apply'}
        title={'Filter'}
        submitHandler={() => handleSubmit(submitTicketFilterForm)()}
        isOk
        cancelText={'Reset'}
        footer
        cancelBtnHandler={() => resetTicketFilterForm?.()}
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
