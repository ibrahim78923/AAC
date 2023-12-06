import Layout from '@/layout';
import { ResponsesList } from '@/modules/airServices/Settings/AgentPerformanceManagement/CannedResponses/ResponsesList';

const Page = () => {
  return <ResponsesList />;
};

export default Page;

Page.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
