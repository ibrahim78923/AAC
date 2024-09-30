import CommonDrawer from '@/components/CommonDrawer';
import { useAddRequestApproval } from './useAddRequestApproval';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';

export const AddRequestApproval = () => {
  const {
    methods,
    handleSubmit,
    onClose,
    onSubmit,
    addRequestApprovalFormFields,
    postApprovalTicketsStatus,
    isPortalOpen,
  } = useAddRequestApproval();

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen}
      onClose={onClose}
      title="Send for Approvals"
      okText="Send"
      isOk
      footer
      submitHandler={handleSubmit(onSubmit)}
      isLoading={postApprovalTicketsStatus?.isLoading}
      isDisabled={postApprovalTicketsStatus?.isLoading}
      disabledCancelBtn={postApprovalTicketsStatus?.isLoading}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {addRequestApprovalFormFields?.map((item: any) => (
            <Grid item xs={12} key={item?._id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
