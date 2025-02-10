import { Box } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { WorkflowHeader } from './WorkflowHeader';
import { scheduledWorkflowDataArray } from './UpsertScheduledWorkflow.data';
import { useUpsertScheduledWorkflow } from './useUpsertScheduledWorkflow';
import { WorkflowSchedule } from './WorkflowSchedule';
import { WorkflowRunAndTrigger } from './WorkflowRunAndTrigger';
import { WorkflowConditions } from './WorkflowConditions';
import { WorkflowActionExecuted } from './WorkflowActionExecuted';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { FormGrid } from '@/components/Grids/FormGrid';

export const UpsertScheduledWorkflow = () => {
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
    saveWorkflowProgress,
    postWorkflowProgress,
    isWorkflowDrawer,
    setIsWorkflowDrawer,
    handleTestWorkflow,
    updatedWorkflowProcess,
    movePage,
  } = useUpsertScheduledWorkflow();

  return (
    <ApiRequestFlow showSkeleton={isLoading || isFetching}>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
        <Box mb={2}>
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
        </Box>
        <FormGrid formFieldsList={scheduledWorkflowDataArray} spacing={1} />
        <ContainerGrid spacing={0}>
          <WorkflowSchedule watch={watch} setValue={setValue} />
        </ContainerGrid>
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
