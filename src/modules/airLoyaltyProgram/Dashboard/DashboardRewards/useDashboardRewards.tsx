import { rewardsColumns, rewardsData } from './DashboardRewards.data';

const useDashboardRewards = () => {
  const contentHeight = 310;

  return {
    rewardsColumns,
    rewardsData,
    contentHeight,
  };
};

export default useDashboardRewards;
