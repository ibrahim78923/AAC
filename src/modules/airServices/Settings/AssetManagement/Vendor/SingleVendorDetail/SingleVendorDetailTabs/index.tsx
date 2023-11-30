import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { SingleVendorDetailTabsData } from './SingleVendorDetailTabs.data';
import { Overview } from '../Overview';
import { Product } from '../Product';
import { Contract } from '../Contract';

export const SingleContractDetailsTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={SingleVendorDetailTabsData}>
      <Overview />
      <Product />
      <Contract />
    </HorizontalTabs>
  );
};
