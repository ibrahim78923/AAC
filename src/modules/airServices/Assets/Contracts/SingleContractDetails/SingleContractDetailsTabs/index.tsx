import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleContractDetailTabsData } from './SingleContractDetailsTabs.data';
import { Overview } from '../Overview';
import { AssetsAssociate } from '../AssetsAssociate';
import { ContractHistory } from '../ContractHistory';
import { Activity } from '../Activity';
import { Attachment } from '../Attachment';
import { CONTRACT_TYPES } from '@/constants/strings';
import { Skeleton } from '@mui/material';

export const SingleContractDetailsTabs = (props: any) => {
  const { apiStatus, data } = props;
  if (apiStatus?.isLoading || apiStatus?.isFetching) return <Skeleton />;
  return (
    <HorizontalTabs tabsDataArray={singleContractDetailTabsData?.(data)}>
      <Overview />
      {data?.data?.contractType !== CONTRACT_TYPES?.SOFTWARE_LICENSE && (
        <AssetsAssociate />
      )}
      <ContractHistory />
      <Activity />
      <Attachment />
    </HorizontalTabs>
  );
};
