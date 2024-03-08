import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import UpsertSupervisorRules from '@/modules/airOperations/WorkflowAutomation/ServicesWorkflow/SupervisorRules/UpsertSupervisorRules';

const UpsertSupervisorRulesPage = () => {
  return <UpsertSupervisorRules />;
};

export default UpsertSupervisorRulesPage;

UpsertSupervisorRulesPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_CREATE_SUPERVISOR_RULES
      }
    >
      {page}
    </Layout>
  );
};
