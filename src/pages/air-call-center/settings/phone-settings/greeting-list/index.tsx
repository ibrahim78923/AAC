import Layout from '@/layout';
import SettingsLayout from '../../layout';

const GreetingListPage = () => {
  return <h1>Greeting List Page</h1>;
};
export default GreetingListPage;

GreetingListPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
