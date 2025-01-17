import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { customerSatisfactionTabsData } from './CustumerSatisfaction.data';

export const CustomerSatisfaction = () => {
  return <PermissionsTabs tabsDataArray={customerSatisfactionTabsData} />;
};
