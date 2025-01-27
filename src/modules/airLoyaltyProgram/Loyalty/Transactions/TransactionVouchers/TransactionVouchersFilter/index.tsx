import { Box } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useTransactionVouchersFilter } from './useTransactionVouchersFilter';
import { FormGrid } from '@/components/Grids/FormGrid';

export const TransactionVouchersFilter = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    transactionFilterFormFields,
  } = useTransactionVouchersFilter(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          closeFilterForm?.();
        }}
        title={'Filter'}
        submitHandler={() => {
          handleSubmit(submit)();
        }}
        footer
        isOk
        okText={'Apply'}
        cancelText={'Reset'}
        cancelBtnHandler={() => resetFilterForm?.()}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <FormGrid formFieldsList={transactionFilterFormFields} />
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};
