import { ReactNode } from 'react';

import useAuth from '../hooks/useAuth';

const useCurrentPermissions = () => {
  const { permissions: currentPermissions }: any = useAuth();

  return currentPermissions;
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

  if (permissionsCheck) {
    return <>{children}</>;
  }

  return <>Permission Denied</>;
}
