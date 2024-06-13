import Layout from '@/layout';
import SettingsLayout from '@/layout/SettingsLayout/Layout';
import PhoneCredits from '@/modules/airCallCenter/Settings/PhoneCredits';

const PhoneCreditsPage = () => {
  return <PhoneCredits />;
};
export default PhoneCreditsPage;

PhoneCreditsPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
