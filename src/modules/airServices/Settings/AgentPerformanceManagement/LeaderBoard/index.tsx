import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import AgentLevels from './AgentLevels';
import AwardPoints from './AwardPoints';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { PageTitledHeader } from '@/components/PageTitledHeader';
const LeaderBoardTabs = ['Award Points', 'Agent Levels'];
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
      <HorizontalTabs tabsDataArray={LeaderBoardTabs}>
        <AwardPoints />
        <AgentLevels />
      </HorizontalTabs>
    </>
  );
};
