import Layout from '@/layout';
import CallQueue from '@/modules/airCallCenter/Settings/PhoneSettings/CallWorkFlow/CallQueue';
import SettingsLayout from '@/layout/SettingsLayout/Layout';

const AirCallCenterPage = () => {
  return <CallQueue />;
};
export default AirCallCenterPage;

AirCallCenterPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
