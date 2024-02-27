import CommonDrawer from '@/components/CommonDrawer';

import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useAddTransaction } from './useAddTransaction';
import { addTransactionDrawerData } from './AddTranscation.data';
export const AddTransaction = (props: any) => {
  const { addTransaction } = props;
  const { handleSubmit, onSubmit, methods, handleCloseDrawer } =
    useAddTransaction(props);
  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={addTransaction}
        onClose={handleCloseDrawer}
        title={'Add Transcation'}
        okText={'Create'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {addTransactionDrawerData?.map((item) => (
                <Grid item xs={12} sm={item?.md} key={item?.id}>
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
