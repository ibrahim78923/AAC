import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleInventoryDetailTabsData } from './SingleInventoryDetailTabs.data';
import { Overview } from '../../Overview';
import { Associations } from '../../Associations';
import { PurchaseOrder } from '../../PurchaseOrders';
import { Contract } from '../../Contract';
import { Expense } from '../../Expense';
import { Activity } from '../../Activity';
import { Software } from '../../Software';
import { Attachment } from '../../Attachment';

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
