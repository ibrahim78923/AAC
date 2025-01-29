import CommonDrawer from '@/components/CommonDrawer';
import { Box } from '@mui/material';
import { transactionFilterData } from './TransactionFilter.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useTransactionFilter } from './useTransactionFilter';
import { FormGrid } from '@/components/Grids/FormGrid';

export const TransactionFilter = (props: any) => {
  const { openDrawer } = props;

  const { methods, handleSubmit, onSubmit, onClose, clearFilter } =
    useTransactionFilter(props);

  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => onClose?.()}
        title={'Add Filters'}
        okText={'Apply'}
        isOk
        cancelText={'Reset'}
        submitHandler={handleSubmit(onSubmit)}
        cancelBtnHandler={() => clearFilter?.()}
        footer
      >
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <FormGrid formFieldsList={transactionFilterData} />
          </FormProvider>
        </Box>
      </CommonDrawer>
    </Box>
  );
};
