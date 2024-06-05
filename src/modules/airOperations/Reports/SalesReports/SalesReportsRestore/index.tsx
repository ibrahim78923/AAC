import { RestoreReportsLists } from '../../RestoreReportsLists';
import { useSalesReportsRestore } from './useSalesReportsRestore';

export const SalesReportsRestore = () => {
  const { apiQueryAllReports, reportsPath } = useSalesReportsRestore();

  return (
    <RestoreReportsLists
      apiQuery={apiQueryAllReports}
      goBack={() => reportsPath?.()}
    />
  );
};
