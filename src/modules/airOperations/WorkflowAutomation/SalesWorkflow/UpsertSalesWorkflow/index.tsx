import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertSalesWorkflow } from './useUpsertSalesWorkflow';
import { WorkflowConditions } from './WorkflowConditions';
import { WorkflowSchedule } from './WorkflowSchedule';
import { WorkflowHeader } from './WorkflowHeader';
import { WorkflowRunAndTrigger } from './WorkflowRunAndTrigger';
import { WorkflowActionExecuted } from './WorkflowActionExecuted';

export const UpsertSalesWorkflow = () => {
  const {
    salesMethod,
    handleFormSubmit,
    register,
    handleSubmit,
    palette,
    setValue,
    control,
    watch,
    isLoading,
  } = useUpsertSalesWorkflow();
  return (
    <Box>
      <FormProvider
        methods={salesMethod}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <WorkflowHeader watch={watch} isLoading={isLoading} />
        <Grid container>
          <WorkflowSchedule
            register={register}
            watch={watch}
            setValue={setValue}
          />
          <WorkflowRunAndTrigger palette={palette} register={register} />
        </Grid>
        <WorkflowConditions
          control={control}
          setValue={setValue}
          watch={watch}
        />
        <WorkflowActionExecuted watch={watch} setValue={setValue} />
      </FormProvider>
    </Box>
  );
};
