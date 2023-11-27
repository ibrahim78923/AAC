import Layout from '@/layout';
import { BusinessHours } from '@/modules/airServices/Settings/ServiceManagement/BusinessHours';

const BusinessHoursPage = () => {
  return <BusinessHours />;
};

export default BusinessHoursPage;

BusinessHoursPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
