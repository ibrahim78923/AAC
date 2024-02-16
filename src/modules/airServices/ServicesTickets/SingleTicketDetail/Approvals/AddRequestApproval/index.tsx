import CommonDrawer from '@/components/CommonDrawer';
import { useAddRequestApproval } from './useAddRequestApproval';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';

export const AddRequestApproval = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    methods,
    handleSubmit,
    onClose,
    onSubmit,
    addRequestApprovalFormFields,
  } = useAddRequestApproval(props);

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
            {addRequestApprovalFormFields?.map((item: any) => (
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
