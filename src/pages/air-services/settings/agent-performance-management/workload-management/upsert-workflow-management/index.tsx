import Layout from '@/layout';
import { UpsertWorkloadSchedule } from '@/modules/airServices/Settings/AgentPerformanceManagement/WorkloadManagement/WorkloadSchedule/UpsertWorkloadSchedule';

const UpsertWorkflowManagementPage = () => {
  return <UpsertWorkloadSchedule />;
};

export default UpsertWorkflowManagementPage;

UpsertWorkflowManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
