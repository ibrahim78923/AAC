import Layout from '@/layout';
import { SalesWorkflow } from '@/modules/airOperations/WorkflowAutomation/SalesWorkflow';

const SalesWorkflowPage = () => {
  return <SalesWorkflow />;
};

export default SalesWorkflowPage;

SalesWorkflowPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
