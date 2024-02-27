import Layout from '@/layout';
import SettingsLayout from '@/layout/SettingsLayout/Layout';

const VoiceMailsPage = () => {
  return <h1>VoiceMailsPage Page</h1>;
};
export default VoiceMailsPage;

VoiceMailsPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
