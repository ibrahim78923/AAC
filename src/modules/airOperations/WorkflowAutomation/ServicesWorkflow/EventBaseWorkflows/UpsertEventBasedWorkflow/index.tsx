import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertEventBasedWorkflow } from './useUpsertEventBasedWorkflow';
import { WorkflowConditions } from './WorkflowConditions';
import { WorkflowHeader } from './WorkflowHeader';
import { WorkflowRunAndTrigger } from './WorkflowRunAndTrigger';
import { WorkflowActionExecuted } from './WorkflowActionExecuted';
import { EventBasedWorkflowDataArray } from './UpsertEventBasedWorkflow.data';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

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
  if (isLoading || isFetching) return <SkeletonForm />;
  return (
    <Box>
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
        <Grid container spacing={2}>
          {EventBasedWorkflowDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
        <Grid container>
          <WorkflowRunAndTrigger palette={palette} />
        </Grid>
        <WorkflowConditions
          control={control}
          moduleType={moduleType}
          watch={watch}
          setValue={setValue}
        />
        <WorkflowActionExecuted watch={watch} setValue={setValue} />
      </FormProvider>
    </Box>
  );
};
