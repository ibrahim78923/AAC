import Layout from '@/layout';
import SettingsLayout from '../../Layout';
import CallWorkFlow from '@/modules/airCallCenter/Settings/PhoneSettings/CallWorkFlow';

const CallworkFlowPage = () => {
  return <CallWorkFlow />;
};
export default CallworkFlowPage;

CallworkFlowPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
