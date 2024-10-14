import Layout from '@/layout';
import { Dashboard } from '@/modules/airLoyaltyProgram/Dashboard';

const AirLoyaltyProgramDashboard = () => <Dashboard />;

export default AirLoyaltyProgramDashboard;

AirLoyaltyProgramDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
