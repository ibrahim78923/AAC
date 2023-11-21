import Layout from '@/layout';
import { CreateDashboard } from '@/modules/airServices/Dashboard/CreateDashboard';

const AirServicesCreateDashboard = () => {
  return <CreateDashboard />;
};

export default AirServicesCreateDashboard;

AirServicesCreateDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
