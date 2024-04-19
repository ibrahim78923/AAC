import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertTransactionsArray } from './UpsertTransactions.data';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertTransactions } from './useUpsertTransactions';

const UpsertTransactions = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const { methods, handleSubmit, submit } = useUpsertTransactions(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen?.isUpsert}
        onClose={() => {
          setIsDrawerOpen({});
        }}
        title={'Add details'}
        submitHandler={() => {
          handleSubmit(submit)();
        }}
        footer
        isOk
        okText={'Save'}
        cancelText="Close"
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              {upsertTransactionsArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
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
