import { ReactNode } from 'react';
import PermissionDenied from '@/components/PermisisonDenied';
import { Box } from '@mui/material';
import useAuth from '@/hooks/useAuth';
import { ROLES } from '@/constants/strings';
import {
  orgAdminAllPermissions,
  superAdminAllPermissions,
} from '@/constants/permissions';

function checkPermissions(permissions: any, modulePermissions: any) {
  const componentPermissionsDictionary: any = {};
  modulePermissions?.forEach((value: any) => {
    componentPermissionsDictionary[value] = true;
  });
  return true;
  if (permissions?.length > 0) {
    for (const permission of permissions) {
      if (componentPermissionsDictionary[permission]) {
        return true; // At least one permission is available
      }
    }
  }
  return false; // None of the permissions are available
}

export default function PermissionsGuard({
  children,
  permissions,
  isPage = false,
}: {
  children: ReactNode;
  permissions: any;
  isPage?: boolean;
}) {
  const { currentPermissions, user } = useAuth();

  let permissionsAvailable = [];

  //this switch is for testing purpose need to remove after org amdin and super admin permissions are cattered at backend
  switch (user?.role) {
    case ROLES.ORG_ADMIN:
      permissionsAvailable = orgAdminAllPermissions;
      break;
    case ROLES.SUPER_ADMIN:
      permissionsAvailable = superAdminAllPermissions;
      break;
    default:
      permissionsAvailable = currentPermissions;
      break;
  }

  const permissionsCheck = checkPermissions(permissionsAvailable, permissions);
  if (permissionsCheck) {
    return <>{children}</>;
  } else if (isPage) {
    <PermissionDenied />;
  } else {
    return <Box></Box>;
  }
}
