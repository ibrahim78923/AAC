import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Dashboard } from '@/modules/airLoyaltyProgram/Dashboard';

const AirLoyaltyProgramDashboard = () => <Dashboard />;

export default AirLoyaltyProgramDashboard;

AirLoyaltyProgramDashboard.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_LOYALTY_PROGRAM_DASHBOARD}>
      {page}
    </Layout>
  );
};
