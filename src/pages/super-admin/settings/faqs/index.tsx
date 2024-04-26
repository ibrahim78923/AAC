import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Faqs from '@/modules/superAdmin/settings/Faqs';

const FaqsPage = () => {
  return <Faqs />;
};
export default FaqsPage;
FaqsPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.SETTING_FAQ}>{page}</Layout>;
};
