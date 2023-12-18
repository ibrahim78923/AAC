import { PageTitledHeader } from '@/components/PageTitledHeader';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { All } from './All';
import { Physical } from './Physical';
import { Digital } from './Digital';
import { singleRewardsTab } from './Rewards.data';

export const Rewards = () => {
  return (
    <>
      <PageTitledHeader title="Rewards" addTitle="Add" />
      <HorizontalTabs tabsDataArray={singleRewardsTab}>
        <All />
        <Physical />
        <Digital />
      </HorizontalTabs>
    </>
  );
};
