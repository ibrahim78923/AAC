import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UpsertEventBasedWorkflow } from '@/modules/airOperations/WorkflowAutomation/ServicesWorkflow/EventBaseWorkflows/UpsertEventBasedWorkflow';

const UpsertEventBasedWorkflowPage = () => {
  return <UpsertEventBasedWorkflow />;
};

export default UpsertEventBasedWorkflowPage;

UpsertEventBasedWorkflowPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_CREATE_EVENT_BASE_WORKFLOW
      }
    >
      {page}
    </Layout>
  );
};
