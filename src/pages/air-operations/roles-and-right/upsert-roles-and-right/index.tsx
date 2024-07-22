import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UpsertRolesAndRight } from '@/modules/airOperations/RolesAndRight/UpsertRolesAndRight';

const UpsertRolesAndRightPage = () => {
  return <UpsertRolesAndRight />;
};

export default UpsertRolesAndRightPage;

UpsertRolesAndRightPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_OPERATIONS_ROLES_AND_RIGHT_ROLES_LIST}
    >
      {page}
    </Layout>
  );
};
