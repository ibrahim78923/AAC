import Layout from '@/layout';
import SettingsLayout from '@/layout/SettingsLayout/Layout';
import { ServiceLevel } from '@/modules/airCallCenter/Settings/PhoneSettings/ServiceLevel';

const ServiceLevelPage = () => {
  return <ServiceLevel />;
};
export default ServiceLevelPage;

ServiceLevelPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
