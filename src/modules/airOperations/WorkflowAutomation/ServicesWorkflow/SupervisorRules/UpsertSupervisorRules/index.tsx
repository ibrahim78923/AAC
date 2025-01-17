import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useRulesWorkflow } from './useRulesWorkflow';
import { WorkflowConditions } from './WorkflowConditions';
import { WorkflowHeader } from './WorkflowHeader';
import { WorkflowRunAndTrigger } from './WorkflowRunAndTrigger';
import { WorkflowActionExecuted } from './WorkflowActionExecuted';
import { rulesWorkflowDataArray } from './UpsertRulesWorkflow.data';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

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
        <Grid container spacing={2}>
          {rulesWorkflowDataArray?.map((item) => (
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
        />
        <WorkflowActionExecuted watch={watch} setValue={setValue} />
      </FormProvider>
    </ApiRequestFlow>
  );
};
export default UpsertSupervisorRules;
