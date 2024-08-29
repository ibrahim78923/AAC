import { softwareTabsData } from './SingleSoftwareDetailTabs.data';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';

export const SingleSoftwareDetailTabs = () => {
  return <PermissionsTabs tabsDataArray={softwareTabsData} />;
};
