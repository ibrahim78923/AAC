import Layout from '@/layout';
import ModuleCreation from '@/modules/superAdmin/settings/ModuleCreation';
const ModuleCreationPAge = () => {
  return <ModuleCreation />;
};
export default ModuleCreationPAge;
ModuleCreationPAge.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
