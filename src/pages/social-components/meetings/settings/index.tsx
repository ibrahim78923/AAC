import Layout from '@/layout';
import { Settings } from '@/modules/SocialComponents/Meetings/Settings';

const MeetingsSettingsPage = () => {
  return <Settings />;
};
export default MeetingsSettingsPage;

MeetingsSettingsPage.getLayout = function getLayout(page: any) {
  return (
    // permissions={Permissions?.SOCIAL_COMPONENTS_MEETINGS}
    <Layout variant="common">{page}</Layout>
  );
};
