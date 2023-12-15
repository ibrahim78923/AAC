import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertTransactionsArray } from './UpsertTransactions.data';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertTransactions } from './useUpsertTransactions';

function UpsertTransactions({
  isDrawerOpen,
  setIsDrawerOpen,
  title,
  okText,
}: any) {
  const { methods, handleSubmit, submit } =
    useUpsertTransactions(setIsDrawerOpen);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        title={title}
        submitHandler={() => {
          handleSubmit(submit)();
        }}
        footer={true}
        isOk={true}
        okText={okText}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
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
}

export default UpsertTransactions;
