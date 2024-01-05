import { ReactNode } from 'react';

import PermissionDenied from '@/components/PermisisonDenied';
import { getActivePermissionsSession } from '@/utils';

const useCurrentPermissions = () => {
  const permissions = getActivePermissionsSession();
  return permissions;
};

function checkPermissions(permissions: any, modulePermissions: any) {
  const componentPermissionsDictionary: any = {};
  modulePermissions?.forEach((value: any) => {
    componentPermissionsDictionary[value] = true;
  });

  for (const permission of permissions) {
    if (componentPermissionsDictionary[permission]) {
      return true; // At least one permission is available
    }
  }
  return false; // None of the permissions are available
}

export default function PermissionsGuard({
  children,
  permissions,
}: {
  children: ReactNode;
  permissions: any;
}) {
  const currentPermissions = useCurrentPermissions();
  const permissionsCheck = checkPermissions(currentPermissions, permissions);

  return permissionsCheck ? <>{children}</> : <PermissionDenied />;
}
