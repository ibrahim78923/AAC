import Layout from '@/layout';
import SettingsLayout from '@/layout/SettingsLayout/Layout';

const PhoneCreditsPage = () => {
  return <h1>Phone Credits</h1>;
};
export default PhoneCreditsPage;

PhoneCreditsPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
