import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';

import { columns, data } from './RoleAndRights.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_ROLES_AND_RIGHTS_PERMISSIONS } from '@/constants/permission-keys';

const RolesAndRights = () => {
  return (
    <>
      <PermissionsGuard
        permissions={[
          SUPER_ADMIN_ROLES_AND_RIGHTS_PERMISSIONS?.ROLES_RIGHTS_LIST,
        ]}
      >
        <TanstackTable columns={columns} data={data} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </PermissionsGuard>
    </>
  );
};

export default RolesAndRights;
