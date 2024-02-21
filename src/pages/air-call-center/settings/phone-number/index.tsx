import Layout from '@/layout';
import SettingsLayout from '../layout';

const PhoneNumberPage = () => {
  return <h1>Phone Number</h1>;
};
export default PhoneNumberPage;

PhoneNumberPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
