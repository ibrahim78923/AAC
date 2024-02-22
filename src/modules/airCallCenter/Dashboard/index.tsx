import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { LiveDashboard } from './LiveDashboard';
import { MyPerformance } from './MyPerformance';

export const Dashboard = () => {
  const ApprovalsTabsData = ['Live dashboard ', 'My Performance'];

  return (
    <HorizontalTabs tabsDataArray={ApprovalsTabsData}>
      <LiveDashboard />
      <MyPerformance />
    </HorizontalTabs>
  );
};
