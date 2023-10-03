import Layout from '@/layout';
import ProductList from '@/modules/settings/ProductList';
const ProductListPage = () => {
  return <ProductList />;
};
export default ProductListPage;
ProductListPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
