import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import AuthGuard from '@/GuardsAndPermissions/AuthGuard';
import DashboardLayout from './MainDashboard';

export default function Layout({
  variant = 'dashboard',
  guardRoute = false,
  children,
  permissions,
}: any) {
  // let childrenEl: any ;

  // if (permissions)
  //   childrenEl = (
  //     <PermissionsGuard permissions={permissions}>{children}</PermissionsGuard>
  //   );

  let layout = null;

  switch (variant) {
    case 'dashboard':
      layout = (
        <AuthGuard>
          <DashboardLayout>
            <PermissionsGuard permissions={permissions}>
              {children}
            </PermissionsGuard>
          </DashboardLayout>
        </AuthGuard>
      );
      break;
    default:
      layout = children;
      break;
  }

  if (guardRoute) return layout;

  return <>{layout}</>;
}
