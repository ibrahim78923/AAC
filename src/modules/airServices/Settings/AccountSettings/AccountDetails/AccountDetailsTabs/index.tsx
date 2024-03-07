import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { accountDetailsTabsData } from './AccountDetailsTabs.data';
import { AccountDetailsSecurity } from '../AccountDetailsSecurity';
import { AccountDetailsProfile } from '../AccountDetailsProfile';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';

export const AccountDetailsTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={accountDetailsTabsData}>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.EDIT_ACCOUNT_DETAILS,
        ]}
      >
        <AccountDetailsProfile />
      </PermissionsGuard>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.EDIT_ACCOUNT_DETAILS,
        ]}
      >
        <AccountDetailsSecurity />
      </PermissionsGuard>
    </HorizontalTabs>
  );
};
