import Layout from '@/layout';
import { UpsertInventory } from '@/modules/airServices/Assets/Inventory/UpsertInventory';
const UpsertInventoryPage = () => {
  return <UpsertInventory />;
};

UpsertInventoryPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default UpsertInventoryPage;
