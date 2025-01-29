import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useEmailTicket } from './useEmailTicket';
import { sendTicketEmailFormFields } from './EmailTicket.data';
import { FormGrid } from '@/components/Grids/FormGrid';

export const EmailTicket = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    onClose,
    apiCallInProgress,
    isPortalOpen,
  } = useEmailTicket();

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen}
      onClose={onClose}
      title={'New Email'}
      isOk
      okText={'Send'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      disabledCancelBtn={apiCallInProgress}
      isDisabled={apiCallInProgress}
      isLoading={apiCallInProgress}
    >
      <FormProvider methods={methods}>
        <FormGrid spacing={1} formFieldsList={sendTicketEmailFormFields} />
      </FormProvider>
    </CommonDrawer>
  );
};
