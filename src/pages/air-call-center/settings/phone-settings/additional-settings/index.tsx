import Layout from '@/layout';
import SettingsLayout from '@/layout/SettingsLayout/Layout';
import AdditionalSettings from '@/modules/airCallCenter/Settings/PhoneSettings/AdditionalSettings';

const AdditionalSettingsPage = () => {
  return <AdditionalSettings />;
};
export default AdditionalSettingsPage;

AdditionalSettingsPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
