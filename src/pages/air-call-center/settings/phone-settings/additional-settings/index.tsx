import Layout from '@/layout';
import SettingsLayout from '@/layout/SettingsLayout/Layout';

const AdditionalSettingsPage = () => {
  return <h1>AdditionalSettingsPage Page</h1>;
};
export default AdditionalSettingsPage;

AdditionalSettingsPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
