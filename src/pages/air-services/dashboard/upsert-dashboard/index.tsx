import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UpsertDashboard } from '@/modules/airServices/Dashboard/UpsertDashboard';

const UpsertServicesDashboardPage = () => {
  return <UpsertDashboard />;
};

export default UpsertServicesDashboardPage;

UpsertServicesDashboardPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_UPSERT_DASHBOARD}>
      {page}
    </Layout>
  );
};
