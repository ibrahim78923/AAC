import Layout from '@/layout';
import BasicIVR from '@/modules/airCallCenter/Settings/PhoneSettings/CallWorkFlow/BasicIVR';
import SettingsLayout from '@/layout/SettingsLayout/Layout';

const AirCallCenterPage = () => {
  return <BasicIVR />;
};

export default AirCallCenterPage;

AirCallCenterPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
