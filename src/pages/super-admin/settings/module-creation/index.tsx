import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import ModuleCreation from '@/modules/superAdmin/settings/ModuleCreation';
const ModuleCreationPAge = () => {
  return <ModuleCreation />;
};
export default ModuleCreationPAge;
ModuleCreationPAge.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.SETTING_MODULE_CREATION}>{page}</Layout>
  );
};
