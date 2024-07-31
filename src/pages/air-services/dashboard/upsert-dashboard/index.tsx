import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { CreateDashboard } from '@/modules/airServices/Dashboard/CreateDashboard';

const UpsertServicesDashboardPage = () => {
  return <CreateDashboard />;
};

export default UpsertServicesDashboardPage;

UpsertServicesDashboardPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_VIEW_DASHBOARD}>
      {page}
    </Layout>
  );
};
