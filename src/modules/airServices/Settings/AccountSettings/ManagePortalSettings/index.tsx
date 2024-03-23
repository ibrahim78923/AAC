import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Permissions } from './Permissions';
import { Settings } from './Settings';
import { singleManagePortalTabs } from './ManagePortalSettings.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';

export const ManagePortalSettings = () => {
  const { push } = useRouter();

  return (
    <>
      <PageTitledHeader
        title="Manage Portal Settings"
        canMovedBack
        moveBack={() => push(AIR_SERVICES?.ACCOUNT_SETTINGS)}
      />
      <HorizontalTabs tabsDataArray={singleManagePortalTabs}>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.SET_CUSTOMER_PORTAL_PERMISSIONS,
          ]}
        >
          <Permissions />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.SET_CUSTOMER_PORTAL_SETTINGS,
          ]}
        >
          <Settings />
        </PermissionsGuard>
      </HorizontalTabs>
    </>
  );
};
