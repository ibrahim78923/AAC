import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { SingleProductCatalogDetails } from '@/modules/airServices/Settings/AssetManagement/ProductCatalog/SingleProductCatalogDetails';

const ProductCatalogDetailsPage = () => {
  return <SingleProductCatalogDetails />;
};

export default ProductCatalogDetailsPage;

ProductCatalogDetailsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_AGENT_MANAGEMENT_PRODUCT_CATALOG_DETAILS
      }
    >
      {page}
    </Layout>
  );
};
