import { useRouter } from 'next/router';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { managePortalTabsData } from './ManagePortalSettings.data';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { AIR_SERVICES } from '@/constants/routes';

export const ManagePortalSettings = () => {
  const { push } = useRouter();

  return (
    <>
      <PageTitledHeader
        title={'Manage Portal Settings'}
        canMovedBack
        moveBack={() => push(AIR_SERVICES?.ACCOUNT_SETTINGS)}
      />

      <PermissionsTabs tabsDataArray={managePortalTabsData} />
    </>
  );
};
