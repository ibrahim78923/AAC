import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import ModuleCreation from '@/modules/superAdmin/settings/ProductList/ModuleCreation';
const ModuleCreationPage = () => {
  return <ModuleCreation />;
};
export default ModuleCreationPage;
ModuleCreationPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.SETTING_PRODUCT_LIST}>{page}</Layout>
  );
};
