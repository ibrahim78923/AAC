import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UpsertScheduledWorkflow } from '@/modules/airOperations/WorkflowAutomation/ServicesWorkflow/ScheduledWorkflows/UpsertScheduledWorkflow';

const UpsertScheduleWorkflowPage = () => {
  return <UpsertScheduledWorkflow />;
};

export default UpsertScheduleWorkflowPage;

UpsertScheduleWorkflowPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_CREATE_SCHEDULE_WORKFLOW
      }
    >
      {page}
    </Layout>
  );
};
