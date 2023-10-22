import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleContractDetailTabsData } from './SingleContractDetailsTabs.data';
import { Overview } from '../../Overview';
import { AssetsAssociate } from '../../AssetsAssociate';
import { Activity } from '../../Activity';
import { Attachment } from '../../../../Inventory/SingleInventoryDetail/Attachment';
import { ContractHistory } from '../../ContractHistory';

export const SingleContractDetailsTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={singleContractDetailTabsData}>
      <Overview />
      <AssetsAssociate />
      <ContractHistory />
      <Activity />
      <Attachment />
    </HorizontalTabs>
  );
};
