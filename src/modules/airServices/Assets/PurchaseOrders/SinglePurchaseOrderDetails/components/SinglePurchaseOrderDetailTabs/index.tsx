import { Overview } from '../../Overview';

import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singlePurchaseOrderDetailTabsData } from './SinglePurchaseOrderDetailsTabs.data';
import { Approvals } from '../../Approvals';
import { Associations } from '../../Associations';
import { AssetsReceived } from '../../AssetsReceived';
import { Attachments } from '../../Attachments';

export const SinglePurchaseOrderDetailTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={singlePurchaseOrderDetailTabsData}>
      <Overview />
      <Approvals />
      <Associations />
      <AssetsReceived />
      <Attachments />
    </HorizontalTabs>
  );
};
