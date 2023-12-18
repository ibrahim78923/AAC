import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Button, Grid } from '@mui/material';
import {
  addVouchersFormFieldsDataFunction,
  addVouchersRadioButtonsFormFields,
} from './AddVouchers.data';
import { useAddVouchers } from './useAddVouchers';

export const AddVouchers = (props: any) => {
  const {
    addVouchersOpen,
    setAddVouchersOpen,
    handleSubmit,
    submitAddVouchersForm,
    methods,
    apiQueryOrganizations,
    watch,
  } = useAddVouchers(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={addVouchersOpen}
        onClose={() => setAddVouchersOpen?.(false)}
        okText={'Create'}
        title={'Create voucher'}
        submitHandler={() => handleSubmit(submitAddVouchersForm)()}
        isOk
        cancelText={'Cancel'}
        footer
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitAddVouchersForm)}
        >
          <Grid container rowSpacing={2.6} columnSpacing={2} mt={-1}>
            {addVouchersFormFieldsDataFunction?.(apiQueryOrganizations)?.map(
              (form: any) => {
                return (
                  <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                    <form.component {...form?.componentProps} size="small" />
                  </Grid>
                );
              },
            )}
            <Grid item xs={12} textAlign="center">
              OR
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disableElevation
              >
                Generate Code
              </Button>
            </Grid>
            {addVouchersRadioButtonsFormFields?.map((form: any, index) => {
              return (
                <>
                  <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                    <form.component {...form?.componentProps} size="small" />
                  </Grid>
                  {watch(form?.componentProps?.name) ===
                    form?.componentProps?.options?.[1]?.value && (
                    <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                      {form?.conditionalComponentOne}
                    </Grid>
                  )}
                  {watch(form?.componentProps?.name) ===
                    form?.componentProps?.options?.[0]?.value &&
                    index === 3 && (
                      <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                        {form?.conditionalComponentTwo}
                      </Grid>
                    )}
                </>
              );
            })}
          </Grid>
        </FormProvider>
      </CommonDrawer>
    </>
  );
};
