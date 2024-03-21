import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { accountDetailsTabsData } from './AccountDetailsTabs.data';
import { Profile } from '../Profile';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';
import { ChangePassword } from '../ChangePassword';

export const AccountDetailsTabs = (props: any) => {
  const { profileDetail } = props;

  return (
    <HorizontalTabs tabsDataArray={accountDetailsTabsData}>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.EDIT_ACCOUNT_DETAILS,
        ]}
      >
        <Profile profileDetail={profileDetail} />
      </PermissionsGuard>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.EDIT_ACCOUNT_DETAILS,
        ]}
      >
        <ChangePassword />
      </PermissionsGuard>
    </HorizontalTabs>
  );
};
