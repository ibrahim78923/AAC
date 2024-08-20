import Layout from '@/layout';
import Call from '@/modules/SocialComponents/Calling/Call';

const CallPage = () => {
  return <Call />;
};
export default CallPage;
CallPage.getLayout = function getLayout(page: any) {
  return (
    // permissions={Permissions?.SOCIAL_COMPONENTS_CALLING}
    <Layout guardRoute variant="common">
      {page}
    </Layout>
  );
};
