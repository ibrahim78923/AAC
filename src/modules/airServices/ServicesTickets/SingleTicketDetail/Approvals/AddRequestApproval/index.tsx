import CommonDrawer from '@/components/CommonDrawer';
import { useAddRequestApproval } from './useAddRequestApproval';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { addRequestApprovalDataArray } from './AddRequestApproval.data';

export const AddRequestApproval = (props: any) => {
  const { isDrawerOpen } = props;
  const { methods, handleSubmit, onClose, onSubmit } =
    useAddRequestApproval(props);

  return (
    <CommonDrawer
      footer
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose()}
      title="Send for Approvals"
      okText="Send"
      isOk
      submitHandler={() => handleSubmit(onSubmit)()}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {addRequestApprovalDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};
