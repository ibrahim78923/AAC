import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { WorkflowAutomation } from '@/modules/airOperations/WorkflowAutomation';

const WorkflowAutomationPage = () => {
  return <WorkflowAutomation />;
};

export default WorkflowAutomationPage;

WorkflowAutomationPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATIONS_WORKFLOWS}>{page}</Layout>
  );
};
