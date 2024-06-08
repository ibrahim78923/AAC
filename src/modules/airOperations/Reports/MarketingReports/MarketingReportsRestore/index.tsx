import { RestoreReportsLists } from '../../RestoreReportsLists';
import { useMarketingReportsRestore } from './useMarketingReportsRestore';

export const MarketingReportsRestore = () => {
  const { apiQueryAllReports, reportsPath } = useMarketingReportsRestore();

  return (
    <RestoreReportsLists
      apiQuery={apiQueryAllReports}
      goBack={() => reportsPath?.()}
    />
  );
};
