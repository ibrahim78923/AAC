import { Box, Grid, Skeleton } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertEventBasedWorkflow } from './useUpsertEventBasedWorkflow';
import { WorkflowConditions } from './WorkflowConditions';
import { WorkflowHeader } from './WorkflowHeader';
import { WorkflowRunAndTrigger } from './WorkflowRunAndTrigger';
import { WorkflowActionExecuted } from './WorkflowActionExecuted';
import { EventBasedWorkflowDataArray } from './UpsertEventBasedWorkflow.data';

export const UpsertEventBasedWorkflow = () => {
  const {
    eventMethod,
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
    setValidation,
    postWorkflowProgress,
    saveWorkflowProgress,
  } = useUpsertEventBasedWorkflow();
  if (isLoading || isFetching) return <Skeleton />;
  return (
    <Box>
      <FormProvider
        methods={eventMethod}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <WorkflowHeader
          setValidation={setValidation}
          postWorkflowProgress={postWorkflowProgress}
          saveWorkflowProgress={saveWorkflowProgress}
        />
        <Grid container spacing={2}>
          {EventBasedWorkflowDataArray?.map((item: any) => (
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
