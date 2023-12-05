import CommonDrawer from '@/components/CommonDrawer';
import { useAddRequestApproval } from './useAddRequestApproval';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { addRequestApprovalDataArray } from './AddRequestApproval.data';
import { v4 as uuidv4 } from 'uuid';
import { enqueueSnackbar } from 'notistack';

export const AddRequestApproval = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const { methods } = useAddRequestApproval();
  const { handleSubmit } = methods;
  const onSubmit = async () => {
    enqueueSnackbar('Request Submit Successfully', {
      variant: 'success',
    });
    setIsDrawerOpen(false);
  };
  return (
    <>
      <CommonDrawer
        footer={true}
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Send for Approvals"
        okText="Send"
        isOk
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {addRequestApprovalDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
