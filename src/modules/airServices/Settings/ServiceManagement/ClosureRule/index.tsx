import { Header } from './Header';
import { useClosureRule } from './useClosureRule';
import { FormProvider } from '@/components/ReactHookForm';
import { IncidentServicesClosureRule } from './IncidentServicesClosureRule';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';

export const ClosureRule = () => {
  const {
    methods,
    closeIncidentData,
    resolveIncidentData,
    serviceCloseData,
    serviceResolveData,
    postClosureRuleProgress,
    isLoading,
    handleCancel,
    isError,
    isFetching,
    onSubmit,
    handleSubmit,
    refetch,
  } = useClosureRule();

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Header />
      <br />
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
      >
        <IncidentServicesClosureRule
          closeIncidentData={closeIncidentData}
          resolveIncidentData={resolveIncidentData}
          serviceCloseData={serviceCloseData}
          serviceResolveData={serviceResolveData}
        />
        <ActionsLoadingButton
          submitButtonText={GENERIC_UPSERT_FORM_CONSTANT?.SAVE}
          showSubmitLoader={postClosureRuleProgress?.isLoading}
          handleCancelButton={handleCancel}
        />
      </ApiRequestFlow>
    </FormProvider>
  );
};
