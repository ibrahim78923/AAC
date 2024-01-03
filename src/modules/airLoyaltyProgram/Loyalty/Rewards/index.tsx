import { PageTitledHeader } from '@/components/PageTitledHeader';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { AllRewards } from './AllRewards';
import { Physical } from './Physical';
import { Digital } from './Digital';
import { singleRewardsTab } from './Rewards.data';
import { useRouter } from 'next/router';
import { AIR_LOYALTY_PROGRAM } from '@/constants';

export const Rewards = () => {
  const router = useRouter();
  return (
    <>
      <PageTitledHeader
        title="Rewards"
        addTitle="Add"
        handleAction={() => {
          router.push(AIR_LOYALTY_PROGRAM?.ADD_REWARDS);
        }}
      />
      <HorizontalTabs tabsDataArray={singleRewardsTab}>
        <AllRewards />
        <Physical />
        <Digital />
      </HorizontalTabs>
    </>
  );
};
