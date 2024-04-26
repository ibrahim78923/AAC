import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertTransactions } from './useUpsertTransactions';

const UpsertTransactions = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    methods,
    handleSubmit,
    submitUpsertLoyaltyTransactions,
    transactionFilterFormFields,
    closeLoyaltyTransactionForm,
    postLoyaltyTransactionsStatus,
  } = useUpsertTransactions(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen?.isUpsert}
        onClose={() => closeLoyaltyTransactionForm()}
        title={'Add details'}
        submitHandler={() => {
          handleSubmit(submitUpsertLoyaltyTransactions)();
        }}
        footer
        isOk
        okText={'Save'}
        cancelText="Close"
        isLoading={postLoyaltyTransactionsStatus?.isLoading}
        isDisabled={postLoyaltyTransactionsStatus?.isLoading}
        disabledCancelBtn={postLoyaltyTransactionsStatus?.isLoading}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              {transactionFilterFormFields?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default UpsertTransactions;
