import Layout from '@/layout';
import SettingsLayout from '../Layout';
import PhoneNumber from '@/modules/airCallCenter/Settings/PhoneNumber';

const PhoneNumberPage = () => {
  return <PhoneNumber />;
};
export default PhoneNumberPage;

PhoneNumberPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
