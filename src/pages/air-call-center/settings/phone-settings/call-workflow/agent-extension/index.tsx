import Layout from '@/layout';
import AgentExtension from '@/modules/airCallCenter/Settings/PhoneSettings/CallWorkFlow/AgentExtension';
import SettingsLayout from '../../../layout';

const AirCallCenterPage = () => {
  return (
    <>
      <AgentExtension />
    </>
  );
};

export default AirCallCenterPage;

AirCallCenterPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
