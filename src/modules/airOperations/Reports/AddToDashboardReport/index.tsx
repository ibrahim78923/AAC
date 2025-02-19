import { FormProvider } from '@/components/ReactHookForm';
import { useAddToDashboardReport } from './useAddToDashboardReport';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { DashboardNameFieldDropdown } from '../ReportFormFields/DashboardNameFieldDropdown';

const AddToDashboardReport = () => {
  const {
    methods,
    handleSubmit,
    submitAddToDashboardForm,
    closeModal,
    addReportsToDashboardStatus,
    isPortalOpen,
  }: any = useAddToDashboardReport();

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={closeModal}
      dialogTitle="Select Dashboard"
      submitButtonText="Apply"
      showSubmitLoader={addReportsToDashboardStatus?.isLoading}
      disabledCancelButton={addReportsToDashboardStatus?.isLoading}
      handleSubmitButton={handleSubmit(submitAddToDashboardForm)}
    >
      <FormProvider methods={methods}>
        <DashboardNameFieldDropdown />
      </FormProvider>
    </CustomCommonDialog>
  );
};

export default AddToDashboardReport;
