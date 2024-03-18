import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { ClosureRule } from '@/modules/airServices/Settings/ServiceManagement/ClosureRule';

const ClosureRolePage = () => {
  return <ClosureRule />;
};

export default ClosureRolePage;

ClosureRolePage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[
        AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.SET_CLOSURE_RULES_AGAINST_TICKETS,
      ]}
    >
      {page}
    </Layout>
  );
};
