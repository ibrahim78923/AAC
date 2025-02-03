import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { TICKET_APPROVALS } from '@/constants/strings';
import { ConfirmModalPropsI } from '../AllApprovals/AllApprovals.interface';
import { useRequestApprovalForm } from './useRequestApprovalForm';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const RequestApprovalForm = (props: ConfirmModalPropsI) => {
  const { isConfirmModalOpen, selectedApproval } = props;
  const {
    handleSubmit,
    submitRequestConfirm,
    methods,
    setModalClose,
    patchApprovalTicketsStatus,
  } = useRequestApprovalForm(props);
  return (
    <CustomCommonDialog
      isPortalOpen={isConfirmModalOpen}
      closePortal={() => setModalClose()}
      dialogTitle={
        selectedApproval?.state === TICKET_APPROVALS?.APPROVE
          ? 'Approve'
          : 'Reject'
      }
      submitButtonText={
        selectedApproval?.state === TICKET_APPROVALS?.APPROVE
          ? 'Approve'
          : 'Reject'
      }
      showSubmitLoader={patchApprovalTicketsStatus?.isLoading}
      disabledCancelButton={patchApprovalTicketsStatus?.isLoading}
      handleSubmitButton={handleSubmit(submitRequestConfirm)}
    >
      <FormProvider methods={methods}>
        <RHFTextField
          name="reason"
          multiline
          rows={7}
          fullWidth
          placeholder="Add Your Remarks here"
          label="Remarks"
          required
        />
      </FormProvider>
    </CustomCommonDialog>
  );
};
