import { RestoreReportsLists } from '../../RestoreReportsLists';
import { useServicesReportsRestore } from './useServicesReportsRestore';

export const ServicesReportsRestore = () => {
  const { apiQueryAllReports, reportsPath } = useServicesReportsRestore();

  return (
    <RestoreReportsLists
      apiQuery={apiQueryAllReports}
      goBack={() => reportsPath?.()}
    />
  );
};
