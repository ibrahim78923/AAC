import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertSalesWorkflow } from './useUpsertSalesWorkflow';
import { WorkflowConditions } from './WorkflowConditions';
import { WorkflowSchedule } from './WorkflowSchedule';
import { WorkflowHeader } from './WorkflowHeader';
import { WorkflowRunAndTrigger } from './WorkflowRunAndTrigger';
import { WorkflowActionExecuted } from './WorkflowActionExecuted';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

export const UpsertSalesWorkflow = () => {
  const {
    methods,
    handleFormSubmit,
    handleSubmit,
    palette,
    setValue,
    control,
    watch,
    isLoading,
    saveLoading,
    setValidation,
    byIdLoading,
    isFetching,
    updateLoading,
    isWorkflowDrawer,
    setIsWorkflowDrawer,
  } = useUpsertSalesWorkflow();
  return (
    <ApiRequestFlow showSkeleton={byIdLoading || isFetching}>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
        <WorkflowHeader
          watch={watch}
          isLoading={isLoading || updateLoading}
          saveLoading={saveLoading}
          setValidation={setValidation}
          isWorkflowDrawer={isWorkflowDrawer}
          setIsWorkflowDrawer={setIsWorkflowDrawer}
        />
        <ContainerGrid spacing={0}>
          <WorkflowSchedule watch={watch} setValue={setValue} />
          <WorkflowRunAndTrigger palette={palette} watch={watch} />
        </ContainerGrid>
        <WorkflowConditions
          control={control}
          setValue={setValue}
          watch={watch}
        />
        <WorkflowActionExecuted watch={watch} setValue={setValue} />
      </FormProvider>
    </ApiRequestFlow>
  );
};
