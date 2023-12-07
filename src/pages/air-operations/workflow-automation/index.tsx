import Layout from '@/layout';
import { WorkflowAutomation } from '@/modules/airOperations/WorkflowAutomation';

const WorkflowAutomationPage = () => {
  return <WorkflowAutomation />;
};

export default WorkflowAutomationPage;

WorkflowAutomationPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
