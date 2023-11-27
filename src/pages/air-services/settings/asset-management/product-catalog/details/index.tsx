import Layout from '@/layout';
import { SingleProductCatalogDetails } from '@/modules/airServices/Settings/AssetManagement/ProductCatalog/SingleProductCatalogDetails';

const ProductCatalogDetailsPage = () => {
  return <SingleProductCatalogDetails />;
};

export default ProductCatalogDetailsPage;

ProductCatalogDetailsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
