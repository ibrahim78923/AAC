import { customerSupportTabsData } from './CustomerSupport.data';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';

export const CustomerSupport = () => {
  return <PermissionsTabs tabsDataArray={customerSupportTabsData} />;
};
