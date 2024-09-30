import { singlePurchaseOrderDetailTabsData } from './SinglePurchaseOrderDetailsTabs.data';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';

export const SinglePurchaseOrderDetailTabs = () => {
  return <PermissionsTabs tabsDataArray={singlePurchaseOrderDetailTabsData} />;
};
