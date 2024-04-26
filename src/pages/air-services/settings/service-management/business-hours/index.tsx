import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { BusinessHours } from '@/modules/airServices/Settings/ServiceManagement/BusinessHours';

const BusinessHoursPage = () => {
  return <BusinessHours />;
};

export default BusinessHoursPage;

BusinessHoursPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_BUSINESS_HOURS
      }
    >
      {page}
    </Layout>
  );
};
