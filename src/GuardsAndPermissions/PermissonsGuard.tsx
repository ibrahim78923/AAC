import { ReactNode } from 'react';

import PermissionDenied from '@/components/PermisisonDenied';
import { getActivePermissionsSession } from '@/utils';
import { Box } from '@mui/material';

const useCurrentPermissions = () => {
  const permissions = getActivePermissionsSession();
  return permissions;
};

function checkPermissions(permissions: any, modulePermissions: any) {
  const componentPermissionsDictionary: any = {};
  modulePermissions?.forEach((value: any) => {
    componentPermissionsDictionary[value] = true;
  });
  // return true;
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
  const currentPermissions = useCurrentPermissions();
  const permissionsCheck = checkPermissions(currentPermissions, permissions);
  if (permissionsCheck) {
    return <>{children}</>;
  } else if (isPage) {
    <PermissionDenied />;
  } else {
    return <Box></Box>;
  }
}
