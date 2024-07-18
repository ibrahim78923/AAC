import {
  AIR_OPERATION_REPORTS_MARKETING_ALL_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_MARKETING_DASHBOARD_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_MARKETING_FAVOURITES_PERMISSIONS,
} from '@/constants/permission-keys';
import { RestoreReportsLists } from '../../RestoreReportsLists';
import { useMarketingReportsRestore } from './useMarketingReportsRestore';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';

export const MarketingReportsRestore = () => {
  const { apiQueryAllReports, reportsPath } = useMarketingReportsRestore();

  return (
    <RestoreReportsLists
      apiQuery={apiQueryAllReports}
      goBack={() => reportsPath?.()}
      baseModule={GENERIC_REPORT_MODULES?.MARKETING}
      permissions={[
        AIR_OPERATION_REPORTS_MARKETING_FAVOURITES_PERMISSIONS?.RESTORE_RECORD,
        AIR_OPERATION_REPORTS_MARKETING_DASHBOARD_REPORTS_PERMISSIONS?.RESTORE_RECORD,
        AIR_OPERATION_REPORTS_MARKETING_ALL_REPORTS_PERMISSIONS?.RESTORE_RECORD,
      ]}
    />
  );
};
