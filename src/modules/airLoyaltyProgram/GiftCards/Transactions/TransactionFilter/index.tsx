import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { transactionFilterData } from './TransactionFilter.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useTransactionFilter } from './useTransactionFilter';

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
            <Grid container spacing={2}>
              {transactionFilterData?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </Box>
  );
};
