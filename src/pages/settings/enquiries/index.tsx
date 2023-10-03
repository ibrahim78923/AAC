import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import Enquiries from '@/modules/settings/Enquiries';

const EnquiriesPage = () => {
  return <Enquiries />;
};
export default EnquiriesPage;
EnquiriesPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
