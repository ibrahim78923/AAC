import Layout from '@/layout';
import SettingsLayout from '../../layout';
import BusinessHours from '@/modules/airCallCenter/Settings/GeneralSettings/BusinessHours';

const BusinessHoursPage = () => {
  return <BusinessHours />;
};
export default BusinessHoursPage;

BusinessHoursPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
