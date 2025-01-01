import { Button } from '@mui/material';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useApproveForm } from './useApproveForm';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const ApproveForm = ({ approvalId }: any) => {
  const {
    approveDialog,
    setApproveDialog,
    methods,
    handleSubmit,
    onSubmit,
    patchRequestApprovalStatus,
  } = useApproveForm(approvalId);
  return (
    <>
      <Button
        variant="outlined"
        sx={{ mx: 2 }}
        className={'small'}
        color="success"
        onClick={() => setApproveDialog(true)}
        startIcon={<CheckCircleIcon />}
      >
        Approve
      </Button>
      <CustomCommonDialog
        isPortalOpen={approveDialog}
        closePortal={() => setApproveDialog(false)}
        dialogTitle="Approved"
        showSubmitLoader={patchRequestApprovalStatus?.isLoading}
        disabledCancelButton={patchRequestApprovalStatus?.isLoading}
        handleSubmitButton={handleSubmit(onSubmit)}
      >
        <FormProvider methods={methods}>
          <RHFTextField
            multiline
            rows={3}
            name="reason"
            label="Reason For Approval"
            required
          />
        </FormProvider>
      </CustomCommonDialog>
    </>
  );
};
