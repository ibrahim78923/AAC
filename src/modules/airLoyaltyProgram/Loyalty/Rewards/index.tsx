import { PageTitledHeader } from '@/components/PageTitledHeader';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { AllRewards } from './AllRewards';
import { Physical } from './Physical';
import { Digital } from './Digital';
import { singleRewardsTab } from './Rewards.data';
import { useRouter } from 'next/router';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS } from '@/constants/permission-keys';

export const Rewards = () => {
  const router = useRouter();
  return (
    <>
      <PageTitledHeader
        title="Rewards"
        addTitle="Add"
        createPermissionKey={[
          AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.ADD_REWARDS,
        ]}
        handleAction={() => {
          router?.push(AIR_LOYALTY_PROGRAM?.ADD_REWARDS);
        }}
      />
      <HorizontalTabs tabsDataArray={singleRewardsTab}>
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.PHYSICAL_REWARDS,
            AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.DIGITAL_REWARDS,
          ]}
        >
          <AllRewards />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.PHYSICAL_REWARDS,
          ]}
        >
          <Physical />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.DIGITAL_REWARDS,
          ]}
        >
          <Digital />
        </PermissionsGuard>
      </HorizontalTabs>
    </>
  );
};
