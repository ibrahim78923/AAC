import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { CreateDashboard } from '@/modules/airServices/Dashboard/CreateDashboard';

const AirServicesCreateDashboard = () => {
  return <CreateDashboard />;
};

export default AirServicesCreateDashboard;

AirServicesCreateDashboard.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_VIEW_DASHBOARD}>
      {page}
    </Layout>
  );
};
