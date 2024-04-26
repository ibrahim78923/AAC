import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UpsertProductCatalog } from '@/modules/airServices/Settings/AssetManagement/ProductCatalog/UpsertProductCatalog';

const UpsertProductCatalogPage = () => {
  return <UpsertProductCatalog />;
};

export default UpsertProductCatalogPage;

UpsertProductCatalogPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_UPSERT_PRODUCTS_CATALOG
      }
    >
      {page}
    </Layout>
  );
};
