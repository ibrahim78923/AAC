import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { LeaderBoard } from '@/modules/airServices/Settings/AgentPerformanceManagement/LeaderBoard';

const LeaderBoardPage = () => {
  return <LeaderBoard />;
};

export default LeaderBoardPage;

LeaderBoardPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[
        Permissions?.AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_LEADER_BOARD,
      ]}
    >
      {page}
    </Layout>
  );
};
