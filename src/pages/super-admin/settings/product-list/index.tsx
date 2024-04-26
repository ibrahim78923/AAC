import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import ProductList from '@/modules/superAdmin/settings/ProductList';
const ProductListPage = () => {
  return <ProductList />;
};
export default ProductListPage;
ProductListPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.SETTING_PRODUCT_LIST}>{page}</Layout>
  );
};
