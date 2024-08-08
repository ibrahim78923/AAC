import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UpsertGenericReports } from '@/modules/airOperations/Reports/UpsertGenericReports';

const UpsertGenericReportsPage = () => {
  return <UpsertGenericReports />;
};

export default UpsertGenericReportsPage;

UpsertGenericReportsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATION_CREATE_REPORT}>
      {page}
    </Layout>
  );
};
