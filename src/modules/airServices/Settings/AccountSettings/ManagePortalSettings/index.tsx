import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Permissions } from './Permissions';
import { Settings } from './Settings';
import { singleManagePortalTabs } from './ManagePortalSettings.data';

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
        <Permissions />
        <Settings />
      </HorizontalTabs>
    </>
  );
};
