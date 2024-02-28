import Layout from '@/layout';
import SettingsLayout from '@/layout/SettingsLayout/Layout';
import AddBusinessHours from '@/modules/airCallCenter/Settings/GeneralSettings/BusinessHours/AddBusinessHours';

const AddBusinessHoursPage = () => {
  return <AddBusinessHours />;
};
export default AddBusinessHoursPage;

AddBusinessHoursPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
