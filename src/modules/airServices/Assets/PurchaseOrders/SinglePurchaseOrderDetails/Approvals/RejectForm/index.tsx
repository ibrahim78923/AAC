import { Button } from '@mui/material';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRejectForm } from './useRejectForm';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const RejectForm = ({ approvalId }: any) => {
  const {
    setRejectDialog,
    rejectDialog,
    methods,
    handleSubmit,
    onSubmit,
    patchRequestApprovalStatus,
  } = useRejectForm(approvalId);

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        className={'small'}
        onClick={() => setRejectDialog(true)}
        startIcon={<CancelIcon />}
      >
        Reject
      </Button>
      <CustomCommonDialog
        isPortalOpen={rejectDialog}
        closePortal={() => setRejectDialog(false)}
        dialogTitle="Rejected"
        showSubmitLoader={patchRequestApprovalStatus?.isLoading}
        disabledCancelButton={patchRequestApprovalStatus?.isLoading}
        handleSubmitButton={handleSubmit(onSubmit)}
      >
        <FormProvider methods={methods}>
          <RHFTextField
            multiline
            rows={3}
            name="reason"
            label="Reason For Rejection"
            required
          />
        </FormProvider>
      </CustomCommonDialog>
    </>
  );
};
