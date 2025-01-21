import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useEmailThisDashboard } from './useEmailThisDashboard';
import { FormGrid } from '@/components/Grids/FormGrid';

const EmailThisDashboard = (props: any) => {
  const { isPortalOpen } = props;
  const {
    methods,
    sendDashboardViaEmailFormFields,
    sendServiceDashboardViaEmailStatus,
    closeDrawer,
    handleSubmit,
    submitEmail,
    sendServiceDashboardViaEmailOnceStatus,
  } = useEmailThisDashboard(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen}
        onClose={closeDrawer}
        title="Email this dashboard"
        submitHandler={handleSubmit(submitEmail)}
        footer
        isOk
        okText="Send"
        isDisabled={
          sendServiceDashboardViaEmailStatus?.isLoading ||
          sendServiceDashboardViaEmailOnceStatus?.isLoading
        }
        isLoading={
          sendServiceDashboardViaEmailStatus?.isLoading ||
          sendServiceDashboardViaEmailOnceStatus?.isLoading
        }
        disabledCancelBtn={
          sendServiceDashboardViaEmailStatus?.isLoading ||
          sendServiceDashboardViaEmailOnceStatus?.isLoading
        }
      >
        <FormProvider methods={methods}>
          <FormGrid
            formFieldsList={sendDashboardViaEmailFormFields}
            hasHeading
          />
        </FormProvider>
      </CommonDrawer>
    </>
  );
};

export default EmailThisDashboard;
