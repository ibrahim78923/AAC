import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Button } from '@mui/material';
import {
  addVouchersFormFieldsDataFunction,
  addVouchersRadioButtonsFormFields,
} from './AddVouchers.data';
import { useAddVouchers } from './useAddVouchers';
import { ARRAY_INDEX } from '@/constants/strings';
import { Fragment } from 'react';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

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
    isError,
    refetch,
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
        <ApiRequestFlow
          showSkeleton={isLoading || isFetching}
          hasError={isError}
          refreshApi={refetch}
        >
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(submitAddVouchersForm)}
          >
            <ContainerGrid>
              {addVouchersFormFieldsDataFunction?.(
                apiQueryVoucherTiers,
                activeFromValue,
              )?.map((form, index) => {
                if (index === ARRAY_INDEX?.THREE) {
                  return (
                    <Fragment key={form?.id}>
                      <CustomGrid md={form?.gridLength}>
                        <form.component
                          {...form?.componentProps}
                          size="small"
                          disabled={!!addVouchersOpen?.voucherCode}
                        />
                      </CustomGrid>
                      <CustomGrid customStyles={{ textAlign: 'center' }}>
                        OR
                      </CustomGrid>
                      <CustomGrid>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          disableElevation
                          disabled={!!addVouchersOpen?.voucherCode}
                          onClick={randomString}
                        >
                          Generate Code
                        </Button>
                      </CustomGrid>
                    </Fragment>
                  );
                }
                return (
                  <CustomGrid md={form?.gridLength} key={form?.id}>
                    <form.component {...form?.componentProps} size="small" />
                  </CustomGrid>
                );
              })}

              {addVouchersRadioButtonsFormFields?.map((form: any, index) => {
                return (
                  <Fragment key={form?.id}>
                    <CustomGrid md={form?.gridLength}>
                      <form.component {...form?.componentProps} size="small" />
                    </CustomGrid>
                    {watch(form?.componentProps?.name) ===
                      form?.componentProps?.options?.[ARRAY_INDEX?.ONE]
                        ?.value && (
                      <CustomGrid md={form?.gridLength} key={form?.id}>
                        {form?.conditionalComponentOne}
                      </CustomGrid>
                    )}
                    {watch(form?.componentProps?.name) ===
                      form?.componentProps?.options?.[ARRAY_INDEX?.ZERO]
                        ?.value &&
                      index === ARRAY_INDEX?.THREE && (
                        <CustomGrid md={form?.gridLength} key={form?.id}>
                          {form?.conditionalComponentTwo}
                        </CustomGrid>
                      )}
                  </Fragment>
                );
              })}
            </ContainerGrid>
          </FormProvider>
        </ApiRequestFlow>
      </CommonDrawer>
    </>
  );
};
