import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { useUpdateRequestStatus } from './useUpdateRequestStatus';
import { capitalizeFirstWord } from '@/utils/api';

export const UpdateRequestStatus = () => {
  const {
    handleSubmit,
    submitRequestConfirm,
    methods,
    setModalClose,
    patchApprovalTicketsStatus,
    dialogType,
    isPortalOpen,
  } = useUpdateRequestStatus();

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={setModalClose}
      dialogTitle={capitalizeFirstWord?.(dialogType)}
      submitButtonText={dialogType?.toLowerCase()}
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
        />
      </FormProvider>
    </CustomCommonDialog>
  );
};
