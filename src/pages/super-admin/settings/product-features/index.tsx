import Layout from '@/layout';
import ProductFeature from '@/modules/superAdmin/settings/ProductFeature';
const ProductFeaturesPage = () => {
  return <ProductFeature />;
};
export default ProductFeaturesPage;
ProductFeaturesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
