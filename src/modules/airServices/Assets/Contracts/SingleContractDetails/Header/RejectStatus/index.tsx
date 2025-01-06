import { useRejectStatus } from './useRejectStatus';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const RejectStatus = (props: any) => {
  const {
    handleClose,
    open,
    handleSubmit,
    onSubmit,
    methods,
    patchContractRejectStatus,
  } = useRejectStatus(props);

  return (
    <CustomCommonDialog
      isPortalOpen={open}
      closePortal={handleClose}
      dialogTitle="Rejected"
      submitButtonText=" Submit"
      showSubmitLoader={patchContractRejectStatus?.isLoading}
      disabledCancelButton={patchContractRejectStatus?.isLoading}
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
  );
};
