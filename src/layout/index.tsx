import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import AuthGuard from '@/GuardsAndPermissions/AuthGuard';
import DashboardLayout from './MainDashboard';

export default function Layout({
  variant = 'dashboard',
  guardRoute = false,
  children,
  accessibleRoles = [],
  permissions,
}: any) {
  let childrenEl: any = children;

  if (accessibleRoles.length && permissions)
    childrenEl = (
      <PermissionsGuard
        accessibleRoles={accessibleRoles}
        permissions={permissions}
      >
        {children}
      </PermissionsGuard>
    );
  let layout = null;

  switch (variant) {
    case 'dashboard':
      layout = (
        <AuthGuard>
          <DashboardLayout> {childrenEl} </DashboardLayout>
        </AuthGuard>
      );
      break;
    default:
      layout = childrenEl;
      break;
  }

  if (guardRoute) return layout;

  return <>{layout}</>;
}
