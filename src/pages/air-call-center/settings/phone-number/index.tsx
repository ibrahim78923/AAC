import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import SettingsLayout from '@/layout/SettingsLayout/Layout';
import PhoneNumber from '@/modules/airCallCenter/Settings/PhoneNumber';

const PhoneNumberPage = () => {
  return <PhoneNumber />;
};
export default PhoneNumberPage;

PhoneNumberPage.getLayout = (page: any) => (
  <Layout
    permissions={Permissions?.AIR_CALL_CENTER_SETTING_CHANNELS_PHONE_NUMBER}
  >
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
