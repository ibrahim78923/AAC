import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import ProductFeature from '@/modules/superAdmin/settings/ProductFeature';
const ProductFeaturesPage = () => {
  return <ProductFeature />;
};
export default ProductFeaturesPage;
ProductFeaturesPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.SETTING_PRODUCT_FEATURES}>{page}</Layout>
  );
};
