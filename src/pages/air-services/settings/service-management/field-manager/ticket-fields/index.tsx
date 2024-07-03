import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import TicketFields from '@/modules/airServices/Settings/ServiceManagement/FieldManager/TicketFields';

const TicketFieldsPage = () => {
  return <TicketFields />;
};

export default TicketFieldsPage;

TicketFieldsPage.getLayout = function getLayout(page: any) {
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
