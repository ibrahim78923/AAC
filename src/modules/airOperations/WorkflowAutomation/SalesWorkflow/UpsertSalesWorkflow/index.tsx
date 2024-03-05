import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertSalesWorkflow } from './useUpsertSalesWorkflow';
import { WorkflowConditions } from './WorkflowConditions';
import { WorkflowSchedule } from './WorkflowSchedule';
import { WorkflowHeader } from './WorkflowHeader';
import { WorkflowRunAndTrigger } from './WorkflowRunAndTrigger';
import { WorkflowActionExecuted } from './WorkflowActionExecuted';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';

export const UpsertSalesWorkflow = () => {
  const {
    salesMethod,
    handleFormSubmit,
    register,
    handleSubmit,
    palette,
    moduleType,
    setValue,
    control,
    watch,
  } = useUpsertSalesWorkflow();
  return (
    <Box>
      <FormProvider
        methods={salesMethod}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <WorkflowHeader watch={watch} />
        <Grid container>
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.SCHEDULE,
            ]}
          >
            <WorkflowSchedule
              register={register}
              watch={watch}
              setValue={setValue}
            />
          </PermissionsGuard>
          <WorkflowRunAndTrigger palette={palette} register={register} />
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
