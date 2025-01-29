import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertAgent } from './useUpsertAgent';
import { IAgentsProps } from '../Agents.interface';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { FormGrid } from '@/components/Grids/FormGrid';
import { DynamicForm } from '@/components/DynamicForm';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export const UpsertAgent = (props: IAgentsProps) => {
  const { isAgentModalOpen, selectedAgentList } = props;
  const {
    methods,
    handleSubmit,
    handleUpsertAgentSubmit,
    handleClose,
    upsertAgentFormFields,
    form,
    apiCallInProgress,
    isDynamicFormLoading,
    hasDynamicFormError,
    getDynamicFormData,
  } = useUpsertAgent(props);

  return (
    <>
      <CustomCommonDialog
        isPortalOpen={isAgentModalOpen}
        closePortal={handleClose}
        dialogTitle={`${
          !!selectedAgentList?.length
            ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
            : GENERIC_UPSERT_FORM_CONSTANT?.ADD
        } Agent`}
        submitButtonText={
          !!selectedAgentList?.length
            ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
            : GENERIC_UPSERT_FORM_CONSTANT?.SAVE
        }
        showSubmitLoader={apiCallInProgress}
        disabledCancelButton={apiCallInProgress}
        handleSubmitButton={handleSubmit(handleUpsertAgentSubmit)}
      >
        <ApiRequestFlow
          showSkeleton={isDynamicFormLoading}
          hasError={hasDynamicFormError}
          refreshApi={getDynamicFormData}
        >
          <FormProvider methods={methods}>
            <FormGrid formFieldsList={upsertAgentFormFields} spacing={1}>
              <DynamicForm dynamicFormFieldsList={form} />
            </FormGrid>
          </FormProvider>
        </ApiRequestFlow>
      </CustomCommonDialog>
    </>
  );
};
