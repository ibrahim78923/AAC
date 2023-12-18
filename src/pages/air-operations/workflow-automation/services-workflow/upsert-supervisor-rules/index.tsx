import Layout from '@/layout';
import UpsertSupervisorRules from '@/modules/airOperations/WorkflowAutomation/ServicesWorkflow/SupervisorRules/UpsertSupervisorRules';

const UpsertSupervisorRulesPage = () => {
  return <UpsertSupervisorRules />;
};

export default UpsertSupervisorRulesPage;

UpsertSupervisorRulesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
