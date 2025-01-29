import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Delegates from '@/modules/orgAdmin/Delegates';

const DelegatesOrgPage = () => {
  return (
    <Layout guardRoute permissions={Permissions?.ORG_ADMIN_DASHBOARD}>
      <Delegates />
    </Layout>
  );
};

export default DelegatesOrgPage;
