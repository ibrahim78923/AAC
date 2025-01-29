import { Box } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useTransactionPointsFilter } from './useTransactionPointsFilter';
import { FormGrid } from '@/components/Grids/FormGrid';

export const TransactionPointsFilter = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    methods,
    handleSubmit,
    submit,
    resetFilterForm,
    closeFilterForm,
    transactionFilterFormFields,
  } = useTransactionPointsFilter(props);

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
