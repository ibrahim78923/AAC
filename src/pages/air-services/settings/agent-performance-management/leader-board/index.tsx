import Layout from '@/layout';
import { LeaderBoard } from '@/modules/airServices/Settings/AgentPerformanceManagement/LeaderBoard';

const LeaderBoardPage = () => {
  return <LeaderBoard />;
};

export default LeaderBoardPage;

LeaderBoardPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
