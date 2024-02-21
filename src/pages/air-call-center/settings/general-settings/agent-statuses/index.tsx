import Layout from '@/layout';
import SettingsLayout from '../../layout';

const AgentStatusesPage = () => {
  return <h1>Business Hours Page</h1>;
};
export default AgentStatusesPage;

AgentStatusesPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
