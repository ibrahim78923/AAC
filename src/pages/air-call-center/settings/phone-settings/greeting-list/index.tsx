import Layout from '@/layout';
import SettingsLayout from '@/layout/SettingsLayout/Layout';
import { MeetingAndGreetingList } from '@/modules/airCallCenter/Settings/PhoneSettings/MeetingAndGreetingList';

const GreetingListPage = () => {
  return <MeetingAndGreetingList />;
};
export default GreetingListPage;

GreetingListPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
