import { ReactNode } from 'react';

import useAuth from '@/hooks/useAuth';

export function PermissionChecker({
  children,
  permissionKey,
}: {
  children: ReactNode;
  permissionKey: string;
}) {
  const useCurrentPermissions = () => {
    const { permissions: currentPermissions }: any = useAuth();

    return currentPermissions;
  };

  const currentPermissions = useCurrentPermissions();

  const currentPermissionHashMap: any = {};

  // Populate the hash map with permissions
  currentPermissions.forEach((value: any) => {
    currentPermissionHashMap[value] = true;
  });

  // Check if a specific permission key exists in the hash map
  const isAllowed = currentPermissionHashMap.hasOwnProperty(permissionKey);

  if (isAllowed) {
    return children;
  }
  return <>Permission Denied</>;
}
