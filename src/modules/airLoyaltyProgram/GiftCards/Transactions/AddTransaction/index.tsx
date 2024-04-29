import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { addTransactionData } from './AddTranscation.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useAddTransaction } from './useAddTransaction';

export const AddTransaction = (props: any) => {
  const { openDrawer } = props;
  const { handleCloseDrawer, methods, onSubmit, handleSubmit } =
    useAddTransaction(props);
  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={handleCloseDrawer}
        title={'Add Transaction'}
        okText={'Create'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {addTransactionData?.map((item: any) => (
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
