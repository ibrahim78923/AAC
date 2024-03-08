import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Dashboard from '@/modules/airCustomerPortal/Dashboard';

const AirCustomerPortalDashboard = () => <Dashboard />;

export default AirCustomerPortalDashboard;

AirCustomerPortalDashboard.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_CUSTOMER_PORTAL_DASHBOARD}>
      {page}
    </Layout>
  );
};
