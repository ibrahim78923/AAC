import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { UpsertInventory } from '@/modules/airServices/Assets/Inventory/UpsertInventory';
const UpsertInventoryPage = () => {
  return <UpsertInventory />;
};

UpsertInventoryPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_ASSETS]}
    >
      {page}
    </Layout>
  );
};

export default UpsertInventoryPage;
