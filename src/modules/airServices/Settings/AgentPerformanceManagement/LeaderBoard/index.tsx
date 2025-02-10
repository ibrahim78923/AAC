import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants/routes';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { leaderBoardTabs } from './LeaderBoard.data';

export const LeaderBoard = () => {
  const router = useRouter();

  return (
    <>
      <PageTitledHeader
        moveBack={() =>
          router?.push({
            pathname: AIR_SERVICES?.AGENT_PERFORMANCE_MANAGEMENT_SETTINGS,
          })
        }
        canMovedBack
        title={'Leader Board'}
      />

      <PermissionsTabs tabsDataArray={leaderBoardTabs} />
    </>
  );
};
