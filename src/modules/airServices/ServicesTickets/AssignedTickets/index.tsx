import { FormProvider } from '@/components/ReactHookForm';
import { useAssignedTickets } from './useAssignedTickets';
import { AgentFieldDropdown } from '../ServiceTicketFormFields/AgentFieldDropdown';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const AssignedTickets = () => {
  const {
    methods,
    handleSubmit,
    submitAssignedTicketsForm,
    closePortal,
    isPortalOpen,
    apiCallInProgress,
  }: any = useAssignedTickets();

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={closePortal}
      dialogTitle="Assign To"
      submitButtonText="Assign"
      showSubmitLoader={apiCallInProgress}
      disabledCancelButton={apiCallInProgress}
      handleSubmitButton={handleSubmit(submitAssignedTicketsForm)}
    >
      <FormProvider methods={methods}>
        <AgentFieldDropdown />
      </FormProvider>
    </CustomCommonDialog>
  );
};
