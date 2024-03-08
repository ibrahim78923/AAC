import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { CreateBusinessHour } from '@/modules/airServices/Settings/ServiceManagement/BusinessHours/CreateBusinessHour';

const CreateBusinessHourPage = () => {
  return <CreateBusinessHour />;
};

export default CreateBusinessHourPage;

CreateBusinessHourPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_ADD_BUSINESS_HOURS
      }
    >
      {page}
    </Layout>
  );
};
