import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { transactionFilterData } from './TransactionFilter.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useTransactionFilter } from './useTransactionFilter';

export const TransactionFilter = (props: any) => {
  const { openDrawer } = props;
  const {
    handleCloseDrawer,
    methods,
    handleSubmit,
    onSubmit,
    getTransactionListStatus,
  } = useTransactionFilter(props);
  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        isLoading={getTransactionListStatus?.isLoading}
        onClose={handleCloseDrawer}
        title={'Add Filters'}
        okText={'Apply'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {transactionFilterData?.map((item) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
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
