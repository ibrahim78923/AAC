import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UpsertInventory } from '@/modules/airServices/Assets/Inventory/UpsertInventory';
const UpsertInventoryPage = () => {
  return <UpsertInventory />;
};

UpsertInventoryPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permission={Permissions?.AIR_SERVICES_ASSETS_INVENTORY_LIST}>
      {page}
    </Layout>
  );
};

export default UpsertInventoryPage;
