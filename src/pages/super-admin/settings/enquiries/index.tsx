import Layout from '@/layout';
import Enquiries from '@/modules/superAdmin/settings/Enquiries';

const EnquiriesPage = () => {
  return <Enquiries />;
};
export default EnquiriesPage;
EnquiriesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
