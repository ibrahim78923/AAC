import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleInventoryDetailTabsData } from './SingleInventoryDetailTabs.data';
import { Associations } from '../Associations';
import { PurchaseOrder } from '../PurchaseOrders';
import { Contract } from '../Contract';
import { Expense } from '../Expense';
import { Activity } from '../Activity';
import { Software } from '../Software';
import { Attachment } from '../Attachment';
import { Overview } from '../Overview';

export const SingleInventoryDetailsTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={singleInventoryDetailTabsData}>
      <Overview />
      <Associations />
      <PurchaseOrder />
      <Contract />
      <Expense />
      <Activity />
      <Software />
      <Attachment />
    </HorizontalTabs>
  );
};
