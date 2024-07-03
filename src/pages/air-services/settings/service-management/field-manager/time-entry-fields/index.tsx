import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import TimeEntryFields from '@/modules/airServices/Settings/ServiceManagement/FieldManager/TimeEntryFields';

const TimeEntryFieldsPage = () => {
  return <TimeEntryFields />;
};

export default TimeEntryFieldsPage;

TimeEntryFieldsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_FIELD_MANAGER_TIME_ENTRY_FIELDS
      }
    >
      {page}
    </Layout>
  );
};
