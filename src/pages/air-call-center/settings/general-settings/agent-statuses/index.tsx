import Layout from '@/layout';
import SettingsLayout from '../../Layout';
import AgentStatuses from '@/modules/airCallCenter/Settings/GeneralSettings/AgentStatuses';

const AgentStatusesPage = () => {
  return <AgentStatuses />;
};
export default AgentStatusesPage;

AgentStatusesPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
