import PermissionsGuard from './PermissonsGuard';

export const ConditionalPermissionGuard = (props: any) => {
  const { hasNoPermission = true, permissions = [], children } = props;
  if (hasNoPermission) return <>{children}</>;
  return (
    <PermissionsGuard permissions={permissions}>{children}</PermissionsGuard>
  );
};
