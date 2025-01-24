import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useEmailThisDashboard } from './useEmailThisDashboard';
import { HeadingFormGrid } from '@/components/Grids/HeadingFormGrid';

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
          <HeadingFormGrid formFieldsList={sendDashboardViaEmailFormFields} />
        </FormProvider>
      </CommonDrawer>
    </>
  );
};

export default EmailThisDashboard;
