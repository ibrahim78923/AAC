import Layout from '@/layout';
import SettingsLayout from '../../layout';

const BusinessHoursPage = () => {
  return <h1>Business Hours Page</h1>;
};
export default BusinessHoursPage;

BusinessHoursPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
