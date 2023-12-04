import Layout from '@/layout';
import { RequestorsViewDetails } from '@/modules/airServices/Settings/UserManagement/Requesters/RequestorsViewDetails';

const RequestersViewPage = () => {
  return <RequestorsViewDetails />;
};

export default RequestersViewPage;

RequestersViewPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
