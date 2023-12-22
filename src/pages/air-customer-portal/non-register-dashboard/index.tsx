import Layout from '@/layout';
import NonRegisterDashboard from '@/modules/airCustomerPortal/Dashboard/NonRegisterDashboard';

const NonRegisterAirCustomerPortalDashboard = () => <NonRegisterDashboard />;

export default NonRegisterAirCustomerPortalDashboard;

NonRegisterAirCustomerPortalDashboard.getLayout = function getLayout(
  page: any,
) {
  return <Layout>{page}</Layout>;
};
