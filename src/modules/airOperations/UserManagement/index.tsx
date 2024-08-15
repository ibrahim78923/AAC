import { userManagementTabsDataDynamic } from './useUserManagement.data';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const UserManagement = () => {
  const userManagementTabsData = userManagementTabsDataDynamic?.();
  return (
    <>
      <PageTitledHeader title="User Management" />
      <PermissionsTabs spacing={0.3} tabsDataArray={userManagementTabsData} />
    </>
  );
};
