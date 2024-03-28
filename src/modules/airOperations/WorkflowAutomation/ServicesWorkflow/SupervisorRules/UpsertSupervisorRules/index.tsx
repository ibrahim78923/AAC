import { Box, Grid, Skeleton } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertSupervisorRules } from './useUpsertEventBasedWorkflow';
import { WorkflowConditions } from './WorkflowConditions';
import { WorkflowHeader } from './WorkflowHeader';
import { WorkflowRunAndTrigger } from './WorkflowRunAndTrigger';
import { WorkflowActionExecuted } from './WorkflowActionExecuted';
import { rulesWorkflowDataArray } from './UpsertEventBasedWorkflow.data';

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
  } = useUpsertSupervisorRules();
  if (isLoading || isFetching) return <Skeleton />;
  return (
    <Box>
      <FormProvider
        methods={rulesMethod}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <WorkflowHeader postWorkflowProgress={postWorkflowProgress} />
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
