import Layout from '@/layout';
import { Settings } from '@/modules/airLoyaltyProgram/Settings';

const SettingsPage = () => <Settings />;

export default SettingsPage;

SettingsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
