import Layout from '@/layout';
import { UpsertScheduledWorkflow } from '@/modules/airOperations/WorkflowAutomation/ServicesWorkflow/ScheduledWorkflows/UpsertScheduledWorkflow';

const UpsertScheduleWorkflowPage = () => {
  return <UpsertScheduledWorkflow />;
};

export default UpsertScheduleWorkflowPage;

UpsertScheduleWorkflowPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
