import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleProductCatalogDetailTabsData } from './SingleProductCatalogDetailsTabs.data';
import { Overview } from '../Overview';
import { Vendors } from '../Vendors';
import { AssociatedAssets } from '../AssociatedAssets';

export const SingleProductCatalogDetailsTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={singleProductCatalogDetailTabsData}>
      <Overview />
      <Vendors />
      <AssociatedAssets />
    </HorizontalTabs>
  );
};
