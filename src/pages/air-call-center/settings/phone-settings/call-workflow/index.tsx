import Layout from '@/layout';
import SettingsLayout from '../../layout';

const CallworkFlowPage = () => {
  return <h1>Callworkflow Page</h1>;
};
export default CallworkFlowPage;

CallworkFlowPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
