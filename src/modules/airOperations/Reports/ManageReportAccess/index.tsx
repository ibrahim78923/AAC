import { FormProvider } from '@/components/ReactHookForm';
import { useManageReportAccess } from './useManageReportAccess';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { FormGrid } from '@/components/Grids/FormGrid';

export const ManageReportAccess = () => {
  const {
    methods,
    handleSubmit,
    submitMangeAccessForm,
    closeModal,
    manageReportAccessFromFields,
    manageReportAccessStatus,
    isPortalOpen,
  }: any = useManageReportAccess();

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={closeModal}
      dialogTitle="Manage Access"
      submitButtonText="Apply"
      showSubmitLoader={manageReportAccessStatus?.isLoading}
      disabledCancelButton={manageReportAccessStatus?.isLoading}
      handleSubmitButton={handleSubmit(submitMangeAccessForm)}
    >
      <FormProvider methods={methods}>
        <FormGrid formFieldsList={manageReportAccessFromFields} />
      </FormProvider>
    </CustomCommonDialog>
  );
};
