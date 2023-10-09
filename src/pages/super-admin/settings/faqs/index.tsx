import Layout from '@/layout';
import Faqs from '@/modules/superAdmin/Settings/Faqs';

const FaqsPage = () => {
  return <Faqs />;
};
export default FaqsPage;
FaqsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
