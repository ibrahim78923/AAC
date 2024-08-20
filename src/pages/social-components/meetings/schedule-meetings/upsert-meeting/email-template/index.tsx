import Layout from '@/layout';
import EmailTemplate from '@/modules/SocialComponents/Meetings/ScheduleMeetings/UpsertMeeting/EmailTemplate';

const EmailTemplatePage = () => {
  return <EmailTemplate />;
};
export default EmailTemplatePage;

EmailTemplatePage.getLayout = function getLayout(page: any) {
  return (
    // permissions={Permissions?.SOCIAL_COMPONENT_UPSERT_MEETING}
    <Layout variant="common">{page}</Layout>
  );
};
