import { SingleVendorDetailTabsData } from './SingleVendorDetailTabs.data';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';

export const SingleContractDetailsTabs = () => {
  return <PermissionsTabs tabsDataArray={SingleVendorDetailTabsData} />;
};
