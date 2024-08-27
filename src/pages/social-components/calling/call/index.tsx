import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Call from '@/modules/SocialComponents/Calling/Call';

const CallPage = () => {
  return <Call />;
};
export default CallPage;
CallPage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.SOCIAL_COMPONENTS_CALLING}>
      {page}
    </Layout>
  );
};
