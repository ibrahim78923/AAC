import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import TaskFields from '@/modules/airServices/Settings/ServiceManagement/FieldManager/TaskFields';

const TaskFieldsPage = () => {
  return <TaskFields />;
};

export default TaskFieldsPage;

TaskFieldsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_FIELD_MANAGER_TASK_TICKET_FIELDS
      }
    >
      {page}
    </Layout>
  );
};
