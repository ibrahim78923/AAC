import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertEventBasedWorkflow } from './useUpsertEventBasedWorkflow';
import { WorkflowConditions } from './WorkflowConditions';
import { WorkflowHeader } from './WorkflowHeader';
import { WorkflowRunAndTrigger } from './WorkflowRunAndTrigger';
import { WorkflowActionExecuted } from './WorkflowActionExecuted';
import { EventBasedWorkflowDataArray } from './UpsertEventBasedWorkflow.data';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { FormGrid } from '@/components/Grids/FormGrid';

export const UpsertEventBasedWorkflow = () => {
  const {
    methods,
    handleFormSubmit,
    handleSubmit,
    palette,
    moduleType,
    control,
    watch,
    setValue,
    isLoading,
    isFetching,
    setValidation,
    postWorkflowProgress,
    saveWorkflowProgress,
    handleTestWorkflow,
    isWorkflowDrawer,
    setIsWorkflowDrawer,
    updatedWorkflowProcess,
    movePage,
  } = useUpsertEventBasedWorkflow();
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
        <FormGrid formFieldsList={EventBasedWorkflowDataArray} spacing={1} />
        <ContainerGrid spacing={0}>
          <WorkflowRunAndTrigger palette={palette} />
        </ContainerGrid>
        <WorkflowConditions
          control={control}
          moduleType={moduleType}
          watch={watch}
          setValue={setValue}
        />
        <WorkflowActionExecuted watch={watch} setValue={setValue} />
      </FormProvider>
    </ApiRequestFlow>
  );
};
