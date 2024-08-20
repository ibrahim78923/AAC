import Layout from '@/layout';
import Calling from '@/modules/SocialComponents/Calling';

const CallingPage = () => {
  return <Calling />;
};
export default CallingPage;
CallingPage.getLayout = function getLayout(page: any) {
  return (
    // permissions={Permissions?.SOCIAL_COMPONENTS_CALLING}
    <Layout guardRoute variant="common">
      {page}
    </Layout>
  );
};
