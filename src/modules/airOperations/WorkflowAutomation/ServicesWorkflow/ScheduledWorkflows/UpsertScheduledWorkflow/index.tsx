import { Box, Grid, Skeleton } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { WorkflowHeader } from './WorkflowHeader';
import { scheduledWorkflowDataArray } from './UpsertScheduledWorkflow.data';
import { useUpsertScheduledWorkflow } from './useUpsertScheduledWorkflow';
import { WorkflowSchedule } from './WorkflowSchedule';
import { WorkflowRunAndTrigger } from './WorkflowRunAndTrigger';
import { WorkflowConditions } from './WorkflowConditions';
import { WorkflowActionExecuted } from './WorkflowActionExecuted';

export const UpsertScheduledWorkflow = () => {
  const {
    scheduledWorkflowMethod,
    handleFormSubmit,
    register,
    handleSubmit,
    palette,
    moduleType,
    control,
    watch,
    setValue,
    isLoading,
    isFetching,
    handleSaveAsDraft,
  } = useUpsertScheduledWorkflow();

  if (isLoading || isFetching) return <Skeleton />;

  return (
    <Box>
      <FormProvider
        methods={scheduledWorkflowMethod}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Box mb={2}>
          <WorkflowHeader handleSaveAsDraft={handleSaveAsDraft} />
        </Box>
        <Grid container spacing={2}>
          {scheduledWorkflowDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
        <Grid container>
          <WorkflowSchedule
            register={register}
            watch={watch}
            setValue={setValue}
          />
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
        />
        <WorkflowActionExecuted watch={watch} setValue={setValue} />
      </FormProvider>
    </Box>
  );
};
