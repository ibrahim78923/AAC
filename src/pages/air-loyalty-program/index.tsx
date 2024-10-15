import Layout from '@/layout';
import { Dashboard } from '@/modules/airLoyaltyProgram/Dashboard';
import { Permissions } from '@/constants/permissions';

const AirLoyaltyProgramDashboard = () => <Dashboard />;

export default AirLoyaltyProgramDashboard;

AirLoyaltyProgramDashboard.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_LOYALTY_PROGRAM_DASHBOARD}>
      {page}
    </Layout>
  );
};
