import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Button, Grid } from '@mui/material';
import {
  addVouchersFormFieldsDataFunction,
  addVouchersRadioButtonsFormFields,
} from './AddVouchers.data';
import { useAddVouchers } from './useAddVouchers';
import { ARRAY_INDEX } from '@/constants/strings';
import { Fragment } from 'react';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

export const AddVouchers = (props: any) => {
  const {
    addVouchersOpen,
    setAddVouchersOpen,
    handleSubmit,
    submitAddVouchersForm,
    methods,
    apiQueryVoucherTiers,
    watch,
    postVouchersStatus,
    randomString,
    activeFromValue,
    isLoading,
    editVouchersStatus,
    isFetching,
  } = useAddVouchers(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={addVouchersOpen?.upsert}
        onClose={() => setAddVouchersOpen?.({})}
        okText={addVouchersOpen?.voucherCode ? 'Update' : 'Create'}
        title={
          addVouchersOpen?.voucherCode ? 'Update voucher' : 'Create voucher'
        }
        submitHandler={() => handleSubmit(submitAddVouchersForm)()}
        isOk
        isLoading={
          postVouchersStatus?.isLoading || editVouchersStatus?.isLoading
        }
        disabledCancelBtn={
          postVouchersStatus?.isLoading || editVouchersStatus?.isLoading
        }
        cancelText={'Cancel'}
        footer
      >
        {isLoading || isFetching ? (
          <SkeletonForm />
        ) : (
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(submitAddVouchersForm)}
          >
            <Grid container spacing={2}>
              {addVouchersFormFieldsDataFunction?.(
                apiQueryVoucherTiers,
                activeFromValue,
              )?.map((form, index) => {
                if (index === ARRAY_INDEX?.THREE) {
                  return (
                    <Fragment key={form?.id}>
                      <Grid item xs={12} md={form?.gridLength}>
                        <form.component
                          {...form?.componentProps}
                          size="small"
                          disabled={!!addVouchersOpen?.id}
                        />
                      </Grid>
                      <Grid item xs={12} textAlign="center">
                        OR
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          disableElevation
                          disabled={!!addVouchersOpen?.id}
                          onClick={randomString}
                        >
                          Generate Code
                        </Button>
                      </Grid>
                    </Fragment>
                  );
                }
                return (
                  <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                    <form.component {...form?.componentProps} size="small" />
                  </Grid>
                );
              })}

              {addVouchersRadioButtonsFormFields?.map((form: any, index) => {
                return (
                  <Fragment key={form?.id}>
                    <Grid item xs={12} md={form?.gridLength}>
                      <form.component {...form?.componentProps} size="small" />
                    </Grid>
                    {watch(form?.componentProps?.name) ===
                      form?.componentProps?.options?.[ARRAY_INDEX?.ONE]
                        ?.value && (
                      <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                        {form?.conditionalComponentOne}
                      </Grid>
                    )}
                    {watch(form?.componentProps?.name) ===
                      form?.componentProps?.options?.[ARRAY_INDEX?.ZERO]
                        ?.value &&
                      index === ARRAY_INDEX?.THREE && (
                        <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                          {form?.conditionalComponentTwo}
                        </Grid>
                      )}
                  </Fragment>
                );
              })}
            </Grid>
          </FormProvider>
        )}
      </CommonDrawer>
    </>
  );
};
