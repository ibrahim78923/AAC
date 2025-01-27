import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { useApproveForm } from './useApproveForm';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const ApproveForm = (props: any) => {
  const { isPortalOpen } = props;
  const { closePortal, methods, handleSubmit, onSubmit, apiCallInProgress } =
    useApproveForm(props);

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={closePortal}
      dialogTitle={isPortalOpen?.action?.toLowerCase()}
      showSubmitLoader={apiCallInProgress}
      disabledCancelButton={apiCallInProgress}
      handleSubmitButton={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods}>
        <RHFTextField
          multiline
          rows={3}
          name="reason"
          label="Reason"
          required
        />
      </FormProvider>
    </CustomCommonDialog>
  );
};
