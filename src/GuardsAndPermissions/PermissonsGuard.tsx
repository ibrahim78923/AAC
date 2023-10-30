import { ReactNode } from 'react';
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

const useCurrentPermissions = () => {
  const { permissions: currentPermissions }: any = useAuth();
  // const role = user?.role;

  //get form useAuth , call api there

  return currentPermissions;
};

function checkPermissions(permissions: any, modulePermissions: any) {
  const userManagementDictionary: any = {};
  modulePermissions.forEach((value: any) => {
    userManagementDictionary[value] = true;
  });

  for (const permission of permissions) {
    if (userManagementDictionary[permission]) {
      return true; // At least one permission is available in user_management
    }
  }
  return false; // None of the permissions are available in user_management
}

export default function PermissionsGuard({
  children,
  permissions,
}: {
  accessibleRoles: string[];
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
