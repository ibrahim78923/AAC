import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { usePurchaseOrderFilter } from './usePurchaseOrderFilter';
import { purchaseOrderFilterFieldsDynamic } from './PurchaseOrderFilter.data';

export const PurchaseOrderFilter = (props: any) => {
  const { isDrawerOpen } = props;

  const {
    methods,
    submitPurchaseOrderFilterForm,
    handleSubmit,
    closePurchaseOrderFilterForm,
    resetPurchaseOrderFilterForm,
  } = usePurchaseOrderFilter(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => closePurchaseOrderFilterForm?.()}
        okText={'Apply'}
        title={'Filter'}
        submitHandler={() => handleSubmit(submitPurchaseOrderFilterForm)()}
        isOk
        cancelText={'Reset'}
        footer
        cancelBtnHandler={() => resetPurchaseOrderFilterForm?.()}
      >
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {purchaseOrderFilterFieldsDynamic?.map((form: any) => (
              <Grid item xs={12} key={form?.id}>
                <form.component {...form?.componentProps} size="small" />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </CommonDrawer>
    </>
  );
};
