import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { ProductCatalog } from '@/modules/airServices/Settings/AssetManagement/ProductCatalog';
const ProductCatalogPage = () => {
  return <ProductCatalog />;
};

export default ProductCatalogPage;

ProductCatalogPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_AGENT_MANAGEMENT_PRODUCT_CATALOG
      }
    >
      {page}
    </Layout>
  );
};
