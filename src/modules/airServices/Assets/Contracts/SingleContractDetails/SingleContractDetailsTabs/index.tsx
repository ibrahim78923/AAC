import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleContractDetailTabsData } from './SingleContractDetailsTabs.data';
import { Overview } from '../Overview';
import { AssetsAssociate } from '../AssetsAssociate';
import { ContractHistory } from '../ContractHistory';
import { Activity } from '../Activity';
import { Attachment } from '../Attachment';

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
