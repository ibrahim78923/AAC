import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import ProductFeature from '@/modules/settings/ProductFeature';
function ProductFeaturesPage() {
  return <ProductFeature />;
}
export default ProductFeaturesPage;
ProductFeaturesPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
