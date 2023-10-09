import Layout from '@/layout';
import Software from '@/modules/Assets/Software';
// import { TicketsLists } from '@/modules//TicketsLists';
const SoftwarePage = () => {
  return <Software />;
};

SoftwarePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default SoftwarePage;
