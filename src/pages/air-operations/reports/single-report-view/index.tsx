import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { SingleGenericReportDetail } from '@/modules/airOperations/Reports/SingleGenericReportDetail';

const SingleGenericReportDetailPage = () => {
  return <SingleGenericReportDetail />;
};

export default SingleGenericReportDetailPage;

SingleGenericReportDetailPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATIONS_WORKFLOWS}>{page}</Layout>
  );
};
