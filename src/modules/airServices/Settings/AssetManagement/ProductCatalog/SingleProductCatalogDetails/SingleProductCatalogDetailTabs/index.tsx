import { singleProductCatalogDetailTabsData } from './SingleProductCatalogDetailsTabs.data';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';

export const SingleProductCatalogDetailsTabs = () => {
  return <PermissionsTabs tabsDataArray={singleProductCatalogDetailTabsData} />;
};
