import Layout from '@/layout';
import SettingsLayout from '@/layout/SettingsLayout/Layout';
import VoiceMails from '@/modules/airCallCenter/Settings/PhoneSettings/VoiceMails';

const VoiceMailsPage = () => {
  return <VoiceMails />;
};
export default VoiceMailsPage;

VoiceMailsPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
