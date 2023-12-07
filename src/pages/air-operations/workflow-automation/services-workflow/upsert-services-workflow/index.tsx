import Layout from '@/layout';
import { UpsertServicesWorkflow } from '@/modules/airOperations/WorkflowAutomation/ServicesWorkflow/UpsertServicesWorkflow';

const UpsertServicesWorkflowPage = () => {
  return <UpsertServicesWorkflow />;
};

export default UpsertServicesWorkflowPage;

UpsertServicesWorkflowPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
