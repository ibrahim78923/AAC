import Layout from '@/layout';
import SettingsLayout from '../../Layout';

const AgentStatusesPage = () => {
  return <h1>Business Hours Page</h1>;
};
export default AgentStatusesPage;

AgentStatusesPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
