import Layout from '@/layout';
import Calling from '@/modules/SocialComponents/Calling';

const CallingPage = () => {
  return <Calling />;
};
export default CallingPage;
CallingPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
