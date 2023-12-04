import Layout from '@/layout';
import { UpsertSalesWorkflow } from '@/modules/airOperations/WorkflowAutomation/SalesWorkflow/UpsertSalesWorkflow';

const UpsertSalesWorkflowPage = () => {
  return <UpsertSalesWorkflow />;
};

export default UpsertSalesWorkflowPage;

UpsertSalesWorkflowPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
