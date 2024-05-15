import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Enquiries from '@/modules/airServices/Enquiries';

const EnquiriesPage = () => {
  return <Enquiries />;
};

EnquiriesPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_ENQUIRIES}>{page}</Layout>
  );
};

export default EnquiriesPage;
