import Layout from '@/layout';
import Dashboard from '@/modules/airCustomerPortal/Dashboard';

const AirCustomerPortalDashboard = () => <Dashboard />;

export default AirCustomerPortalDashboard;

AirCustomerPortalDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
