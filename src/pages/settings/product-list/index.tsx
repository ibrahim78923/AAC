import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import ProductList from '@/modules/settings/ProductList';
function ProductListPage() {
  return <ProductList />;
}
export default ProductListPage;
ProductListPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
