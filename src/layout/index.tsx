import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import DashboardLayout from './MainDashboard';
import AuthGuard from '@/GuardsAndPermissions/AuthGuard';

export default function Layout({
  variant = 'dashboard',
  guardRoute = false,
  children,
  permissions,
}: any) {
  let childrenEl: any = children;

  if (permissions)
    childrenEl = (
      <PermissionsGuard permissions={permissions}>{children}</PermissionsGuard>
    );
  let layout = null;

  switch (variant) {
    case 'dashboard':
      layout = (
        <AuthGuard>
          <DashboardLayout> {childrenEl} </DashboardLayout>
        // </AuthGuard>
      );
      break;
    default:
      layout = childrenEl;
      break;
  }

  if (guardRoute) return layout;

  return <>{layout}</>;
}
