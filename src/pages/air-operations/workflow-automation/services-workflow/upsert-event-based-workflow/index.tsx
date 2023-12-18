import Layout from '@/layout';
import { UpsertEventBasedWorkflow } from '@/modules/airOperations/WorkflowAutomation/ServicesWorkflow/EventBaseWorkflows/UpsertEventBasedWorkflow';

const UpsertEventBasedWorkflowPage = () => {
  return <UpsertEventBasedWorkflow />;
};

export default UpsertEventBasedWorkflowPage;

UpsertEventBasedWorkflowPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
