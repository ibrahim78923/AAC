import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useRulesWorkflow } from './useRulesWorkflow';
import { WorkflowConditions } from './WorkflowConditions';
import { WorkflowHeader } from './WorkflowHeader';
import { WorkflowRunAndTrigger } from './WorkflowRunAndTrigger';
import { WorkflowActionExecuted } from './WorkflowActionExecuted';
import { rulesWorkflowDataArray } from './UpsertRulesWorkflow.data';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

export const UpsertSupervisorRules = () => {
  const {
    rulesMethod,
    handleFormSubmit,
    register,
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
    testWorkflowProgress,
    updatedWorkflowProcess,
    handleTestWorkflow,
    testWorkflowResponse,
    movePage,
  } = useRulesWorkflow();
  if (isLoading || isFetching) return <SkeletonForm />;
  return (
    <Box>
      <FormProvider
        methods={rulesMethod}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
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
        <Grid container spacing={2}>
          {rulesWorkflowDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
        <Grid container>
          <WorkflowRunAndTrigger
            palette={palette}
            register={register}
            watch={watch}
          />
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
export default UpsertSupervisorRules;
