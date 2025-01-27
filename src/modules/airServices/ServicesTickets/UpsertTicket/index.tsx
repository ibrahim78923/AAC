import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertTicket } from './useUpsertTicket';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { TicketAttachment } from '../TicketAttachment';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';
import { DynamicForm } from '@/components/DynamicForm';

export const UpsertTicket = () => {
  const {
    handleSubmit,
    submitUpsertTicket,
    methods,
    onClose,
    ticketId,
    upsertTicketFormFields,
    isError,
    form,
    isPortalOpen,
    apiCallInProgress,
    showLoader,
    hasError,
    refreshApi,
  }: any = useUpsertTicket();

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen as boolean}
      onClose={onClose}
      okText={
        !!ticketId
          ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
          : GENERIC_UPSERT_FORM_CONSTANT?.SUBMIT
      }
      title={`${
        !!ticketId
          ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
          : GENERIC_UPSERT_FORM_CONSTANT?.CREATE
      } Ticket`}
      submitHandler={handleSubmit(submitUpsertTicket)}
      isOk
      footer
      isLoading={apiCallInProgress}
      isDisabled={showLoader}
      disabledCancelBtn={apiCallInProgress}
    >
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={hasError}
        refreshApi={refreshApi}
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitUpsertTicket)}
        >
          <FormGrid
            spacing={1.5}
            formFieldsList={upsertTicketFormFields}
            disabled={isError}
          >
            {!!!ticketId && <DynamicForm dynamicFormFieldsList={form} />}
          </FormGrid>
          <br />
          <TicketAttachment ticketId={ticketId} />
        </FormProvider>
      </ApiRequestFlow>
    </CommonDrawer>
  );
};
