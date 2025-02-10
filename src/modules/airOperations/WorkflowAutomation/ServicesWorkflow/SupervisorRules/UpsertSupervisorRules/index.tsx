import { FormProvider } from '@/components/ReactHookForm';
import { useRulesWorkflow } from './useRulesWorkflow';
import { WorkflowConditions } from './WorkflowConditions';
import { WorkflowHeader } from './WorkflowHeader';
import { WorkflowRunAndTrigger } from './WorkflowRunAndTrigger';
import { WorkflowActionExecuted } from './WorkflowActionExecuted';
import { rulesWorkflowDataArray } from './UpsertRulesWorkflow.data';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

export const UpsertSupervisorRules = () => {
  const {
    methods,
    handleFormSubmit,
    handleSubmit,
    palette,
    moduleType,
    control,
    watch,
    setValue,
    postWorkflowProgress,
    isLoading,
    isFetching,
    setValidation,
    saveWorkflowProgress,
    isWorkflowDrawer,
    setIsWorkflowDrawer,
    updatedWorkflowProcess,
    handleTestWorkflow,
    movePage,
  } = useRulesWorkflow();
  return (
    <ApiRequestFlow showSkeleton={isLoading || isFetching}>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
        <WorkflowHeader
          setValidation={setValidation}
          isWorkflowDrawer={isWorkflowDrawer}
          setIsWorkflowDrawer={setIsWorkflowDrawer}
          postWorkflowProgress={postWorkflowProgress}
          saveWorkflowProgress={saveWorkflowProgress}
          handleTestWorkflow={handleTestWorkflow}
          updatedWorkflowProcess={updatedWorkflowProcess}
          watch={watch}
          movePage={movePage}
        />
        <FormGrid formFieldsList={rulesWorkflowDataArray} />
        <ContainerGrid spacing={0}>
          <WorkflowRunAndTrigger palette={palette} />
        </ContainerGrid>
        <WorkflowConditions
          control={control}
          moduleType={moduleType}
          watch={watch}
        />
        <WorkflowActionExecuted watch={watch} setValue={setValue} />
      </FormProvider>
    </ApiRequestFlow>
  );
};
export default UpsertSupervisorRules;
