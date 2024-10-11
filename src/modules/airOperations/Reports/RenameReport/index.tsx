import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { useRenameReport } from './useRenameReport';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const RenameReport = () => {
  const {
    onSubmit,
    handleSubmit,
    methods,
    handleClose,
    renameReportsStatus,
    isPortalOpen,
  } = useRenameReport();

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={handleClose}
      dialogTitle="Rename Report"
      submitButtonText="Apply"
      showSubmitLoader={renameReportsStatus?.isLoading}
      disabledCancelButton={renameReportsStatus?.isLoading}
      handleSubmitButton={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods}>
        <RHFTextField
          name="name"
          size="small"
          required
          fullWidth
          label="Report Name"
          placeholder="Enter Report Name"
        />
      </FormProvider>
    </CustomCommonDialog>
  );
};
