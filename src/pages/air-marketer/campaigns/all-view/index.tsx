import TanstackTable from '@/components/Table/TanstackTable';
import Layout from '@/layout';

const AllViewPage = () => {
  return <TanstackTable />;
};
export default AllViewPage;
AllViewPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
