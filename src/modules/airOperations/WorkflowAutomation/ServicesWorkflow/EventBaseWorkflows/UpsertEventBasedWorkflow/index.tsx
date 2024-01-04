import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertEventBasedWorkflow } from './useUpsertEventBasedWorkflow';
import { WorkflowConditions } from './WorkflowConditions';
import { WorkflowHeader } from './WorkflowHeader';
import { WorkflowRunAndTrigger } from './WorkflowRunAndTrigger';
import { WorkflowActionExecuted } from './WorkflowActionExecuted';
import { EventBasedWorkflowDataArray } from './UpsertEventBasedWorkflow.data';

export const UpsertEventBasedWorkflow = () => {
  const {
    salesMethod,
    handleFormSubmit,
    register,
    handleSubmit,
    palette,
    moduleType,
    control,
    watch,
  } = useUpsertEventBasedWorkflow();
  return (
    <Box>
      <FormProvider
        methods={salesMethod}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <WorkflowHeader />
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
        />
        <WorkflowActionExecuted />
      </FormProvider>
    </Box>
  );
};
