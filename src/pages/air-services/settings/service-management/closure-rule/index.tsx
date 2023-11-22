import Layout from '@/layout';
import { ClosureRole } from '@/modules/airServices/Settings/ServiceManagement/ClosureRole';

const ClosureRolePage = () => {
  return <ClosureRole />;
};

export default ClosureRolePage;

ClosureRolePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
