import Layout from '@/layout';
import { Dashboard } from '@/modules/airCallCenter/Dashboard';

const AirCallCenterPage = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};
export default AirCallCenterPage;
AirCallCenterPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
