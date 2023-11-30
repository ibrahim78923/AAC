import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { emailNotificationDetailTabsData } from './EmailNotificationDetailTabs.data';
import { Tickets } from '../Tickets';
import { Assets } from '../Assets';
import { Contracts } from '../Contracts';
import { Tasks } from '../Tasks';
import { PurchaseOrders } from '../PurchaseOrders';

export const EmailNotificationDetailTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={emailNotificationDetailTabsData}>
      <Tickets />
      <Assets />
      <Contracts />
      <Tasks />
      <PurchaseOrders />
    </HorizontalTabs>
  );
};
