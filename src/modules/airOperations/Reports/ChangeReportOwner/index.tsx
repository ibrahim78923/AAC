import { FormProvider } from '@/components/ReactHookForm';
import { useChangeReportOwner } from './useChangeReportOwner';
import { ReportOwnerFieldDropdown } from '../ReportFormFields/ReportOwnerFieldDropdown';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const ChangeReportOwner = () => {
  const {
    methods,
    handleSubmit,
    submitChangeOwner,
    closeModal,
    changeReportOwnerStatus,
    isPortalOpen,
  } = useChangeReportOwner();

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={closeModal}
      dialogTitle="Change Owner"
      submitButtonText="Apply"
      showSubmitLoader={changeReportOwnerStatus?.isLoading}
      disabledCancelButton={changeReportOwnerStatus?.isLoading}
      handleSubmitButton={handleSubmit(submitChangeOwner)}
    >
      <FormProvider methods={methods}>
        <ReportOwnerFieldDropdown />
      </FormProvider>
    </CustomCommonDialog>
  );
};
