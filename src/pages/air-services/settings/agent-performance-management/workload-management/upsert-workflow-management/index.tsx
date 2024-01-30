import Layout from '@/layout';
import { CreateScheduleForm } from '@/modules/airServices/Settings/AgentPerformanceManagement/WorkloadManagement/WorkloadSchedule/CreateScheduleForm';

const UpsertWorkflowManagementPage = () => {
  return <CreateScheduleForm />;
};

export default UpsertWorkflowManagementPage;

UpsertWorkflowManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
