import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UpsertSalesWorkflow } from '@/modules/airOperations/WorkflowAutomation/SalesWorkflow/UpsertSalesWorkflow';

const UpsertSalesWorkflowPage = () => {
  return <UpsertSalesWorkflow />;
};

export default UpsertSalesWorkflowPage;

UpsertSalesWorkflowPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_OPERATIONS_WORKFLOWS_UPSERT_SALES_WORKFLOW}
    >
      {page}
    </Layout>
  );
};
