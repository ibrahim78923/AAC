import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useEmailReport } from './useEmailReport';
import { emailReportFormFields } from './EmailReport.data';
import { FormGrid } from '@/components/Grids/FormGrid';
import { CustomLoadingButton } from '@/components/Buttons/CustomLoadingButton';

const EmailReport = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    onClose,
    emailReportsStatus,
    downloadPath,
    isPortalOpen,
  } = useEmailReport();

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen as boolean}
      onClose={onClose}
      title="Email this report"
      isOk
      okText={'Send'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      disabledCancelBtn={emailReportsStatus?.isLoading}
      isDisabled={emailReportsStatus?.isLoading}
      isLoading={emailReportsStatus?.isLoading}
    >
      <FormProvider methods={methods}>
        <FormGrid formFieldsList={emailReportFormFields} />
      </FormProvider>
      <br />
      <CustomLoadingButton onClick={downloadPath}>
        Click here to download Report
      </CustomLoadingButton>
      <br />
      <br />
    </CommonDrawer>
  );
};

export default EmailReport;
