import CommonDrawer from '@/components/CommonDrawer';
import { useAddRequestApproval } from './useAddRequestApproval';
import { FormProvider } from '@/components/ReactHookForm';
import { FormGrid } from '@/components/Grids/FormGrid';

export const AddRequestApproval = () => {
  const {
    methods,
    handleSubmit,
    onClose,
    onSubmit,
    addRequestApprovalFormFields,
    isPortalOpen,
    apiCallInProgress,
  } = useAddRequestApproval();

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen}
      onClose={onClose}
      title="Send for Approvals"
      okText="Send"
      isOk
      footer
      submitHandler={handleSubmit(onSubmit)}
      isLoading={apiCallInProgress}
      isDisabled={apiCallInProgress}
      disabledCancelBtn={apiCallInProgress}
    >
      <FormProvider methods={methods}>
        <FormGrid formFieldsList={addRequestApprovalFormFields} />
      </FormProvider>
    </CommonDrawer>
  );
};
