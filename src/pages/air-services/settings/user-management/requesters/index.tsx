import Layout from '@/layout';
import { Requesters } from '@/modules/airServices/Settings/UserManagement/Requesters';

const RequestersPage = () => {
  return <Requesters />;
};

export default RequestersPage;

RequestersPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
