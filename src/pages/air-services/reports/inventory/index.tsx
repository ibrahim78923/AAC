import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { InventoryReports } from '@/modules/airServices/Assets/Inventory/InventoryReports';

const InventoryReportsPage = () => {
  return <InventoryReports />;
};

export default InventoryReportsPage;

InventoryReportsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT}>
      {page}
    </Layout>
  );
};
