import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { WorkflowHeader } from './WorkflowHeader';
import { scheduledWorkflowDataArray } from './UpsertScheduledWorkflow.data';
import { useUpsertScheduledWorkflow } from './useUpsertScheduledWorkflow';
import { WorkflowSchedule } from './WorkflowSchedule';
import { WorkflowRunAndTrigger } from './WorkflowRunAndTrigger';
import { WorkflowConditions } from './WorkflowConditions';
import { WorkflowActionExecuted } from './WorkflowActionExecuted';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

export const UpsertScheduledWorkflow = () => {
  const {
    scheduledWorkflowMethod,
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
    testWorkflowProgress,
    updatedWorkflowProcess,
    testWorkflowResponse,
    movePage,
  } = useUpsertScheduledWorkflow();

  if (isLoading || isFetching) return <SkeletonForm />;

  return (
    <Box>
      <FormProvider
        methods={scheduledWorkflowMethod}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Box mb={2}>
          <WorkflowHeader
            setValidation={setValidation}
            isWorkflowDrawer={isWorkflowDrawer}
            setIsWorkflowDrawer={setIsWorkflowDrawer}
            postWorkflowProgress={postWorkflowProgress}
            saveWorkflowProgress={saveWorkflowProgress}
            handleTestWorkflow={handleTestWorkflow}
            testWorkflowProgress={testWorkflowProgress}
            updatedWorkflowProcess={updatedWorkflowProcess}
            testWorkflowResponse={testWorkflowResponse}
            watch={watch}
            movePage={movePage}
          />
        </Box>
        <Grid container spacing={2}>
          {scheduledWorkflowDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
        <Grid container>
          <WorkflowSchedule watch={watch} setValue={setValue} />
        </Grid>
        <Grid container>
          <WorkflowRunAndTrigger palette={palette} />
        </Grid>
        <WorkflowConditions
          control={control}
          moduleType={moduleType}
          watch={watch}
        />
        <WorkflowActionExecuted watch={watch} setValue={setValue} />
      </FormProvider>
    </Box>
  );
};
