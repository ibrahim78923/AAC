import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import AuthGuard from '@/GuardsAndPermissions/AuthGuard';
import DashboardLayout from './MainDashboard';
import CustomerPortalLayout from './CustomerPortal';
import PreventBackNavigation from '@/components/PreventBackNavigation';
import PlainLayout from './PlainLayout';

export default function Layout({
  variant = 'dashboard',
  guardRoute = false,
  children,
  permissions,
}: any) {
  let layout = null;

  switch (variant) {
    case 'dashboard':
      layout = (
        <AuthGuard>
          <DashboardLayout>
            <PermissionsGuard isPage={true} permissions={permissions}>
              <PreventBackNavigation /> {children}
            </PermissionsGuard>
          </DashboardLayout>
        </AuthGuard>
      );
      break;
    case 'public':
      layout = <DashboardLayout>{children}</DashboardLayout>;
      break;
    case 'customer-portal':
      layout = (
        <CustomerPortalLayout>
          {' '}
          <PreventBackNavigation /> {children}
        </CustomerPortalLayout>
      );
      break;
    case 'plain':
      layout = (
        <AuthGuard>
          <PlainLayout>{children}</PlainLayout>
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
