import Layout from '@/layout';
import { UpsertMarketingWorkflow } from '@/modules/airOperations/WorkflowAutomation/MarketingWorkflow/UpsertMarketingWorkflow';

const UpsertMarketingWorkflowPage = () => {
  return <UpsertMarketingWorkflow />;
};

export default UpsertMarketingWorkflowPage;

UpsertMarketingWorkflowPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
