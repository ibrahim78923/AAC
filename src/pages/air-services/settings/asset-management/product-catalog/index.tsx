import Layout from '@/layout';
import { ProductCatalog } from '@/modules/airServices/Settings/AssetManagement/ProductCatalog';

const ProductCatalogPage = () => {
  return <ProductCatalog />;
};

export default ProductCatalogPage;

ProductCatalogPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
