import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { singleInventoryDetailTabsData } from './SingleInventoryDetailTabs.data';

export const SingleInventoryDetailsTabs = () => {
  return <PermissionsTabs tabsDataArray={singleInventoryDetailTabsData} />;
};
