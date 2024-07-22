import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import SettingsLayout from '@/layout/SettingsLayout/Layout';
import AgentStatuses from '@/modules/airCallCenter/Settings/GeneralSettings/AgentStatuses';

const AgentStatusesPage = () => {
  return <AgentStatuses />;
};
export default AgentStatusesPage;

AgentStatusesPage.getLayout = (page: any) => (
  <Layout permission={Permissions?.AIR_CALL_CENTER_SETTING_GENERAL_SETTING}>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
