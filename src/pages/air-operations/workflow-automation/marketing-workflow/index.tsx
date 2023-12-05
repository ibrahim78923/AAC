import Layout from '@/layout';
import { MarketingWorkflow } from '@/modules/airOperations/WorkflowAutomation/MarketingWorkflow';

const MarketingWorkflowPage = () => {
  return <MarketingWorkflow />;
};

export default MarketingWorkflowPage;

MarketingWorkflowPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
