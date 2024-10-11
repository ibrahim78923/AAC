import { ReactNode } from 'react';
import PermissionDenied from '@/components/PermisisonDenied';
import useAuth from '@/hooks/useAuth';
import { bypassPermissionsDictionary } from '@/constants';

function checkPermissions(permissions: any, modulePermissions: any) {
  const componentPermissionsDictionary: any = {};

  let bypass = false;

  modulePermissions?.forEach((value: any) => {
    if (bypassPermissionsDictionary[value]) bypass = true;
    componentPermissionsDictionary[value] = true;
  });

  if (bypass) return true;

  if (permissions?.length > 0) {
    for (const permission of permissions) {
      if (
        componentPermissionsDictionary[permission] ||
        bypassPermissionsDictionary[permission]
      ) {
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
  const { currentPermissions } = useAuth();

  const permissionsAvailable = currentPermissions;

  const permissionsCheck = checkPermissions(permissionsAvailable, permissions);
  if (permissionsCheck) {
    return <>{children}</>;
  } else if (isPage) {
    <PermissionDenied />;
  } else {
    return <></>;
  }
}
