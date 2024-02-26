import Layout from '@/layout';
import SettingsLayout from '../../Layout';

const ServiceLevelPage = () => {
  return <h1>ServiceLevelPage</h1>;
};
export default ServiceLevelPage;

ServiceLevelPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
