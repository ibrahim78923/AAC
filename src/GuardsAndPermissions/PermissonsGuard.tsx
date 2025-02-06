import { ReactNode } from 'react';
import PermissionDenied from '@/components/PermisisonDenied';
import useAuth from '@/hooks/useAuth';
import { bypassPermissionsDictionary } from '@/constants';

function checkPermissions(userPermissions: any, modulePermissions: any) {
  if (!modulePermissions?.length) return false;
  if (
    modulePermissions?.some(
      (permission: string) => bypassPermissionsDictionary?.[permission],
    )
  ) {
    return true;
  }

  if (!userPermissions?.length) return false;

  const modulePermissionsSet = new Set(modulePermissions);

  return userPermissions?.some(
    (permission: string) => modulePermissionsSet?.has(permission),
  );
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
