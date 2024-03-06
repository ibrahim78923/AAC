import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { ServicesWorkflow } from '@/modules/airOperations/WorkflowAutomation/ServicesWorkflow';

const ServicesWorkflowPage = () => {
  return <ServicesWorkflow />;
};

export default ServicesWorkflowPage;

ServicesWorkflowPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW}
    >
      {page}
    </Layout>
  );
};
