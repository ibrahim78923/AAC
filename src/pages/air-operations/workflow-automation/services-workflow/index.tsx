import Layout from '@/layout';
import { ServicesWorkflow } from '@/modules/airOperations/WorkflowAutomation/ServicesWorkflow';

const ServicesWorkflowPage = () => {
  return <ServicesWorkflow />;
};

export default ServicesWorkflowPage;

ServicesWorkflowPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
