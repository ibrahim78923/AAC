import {
  AIR_OPERATION_REPORTS_SALES_ALL_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SALES_DASHBOARD_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SALES_FAVOURITES_PERMISSIONS,
} from '@/constants/permission-keys';
import { RestoreReportsLists } from '../../RestoreReportsLists';
import { useSalesReportsRestore } from './useSalesReportsRestore';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';

export const SalesReportsRestore = () => {
  const { apiQueryAllReports, reportsPath } = useSalesReportsRestore();

  return (
    <RestoreReportsLists
      apiQuery={apiQueryAllReports}
      goBack={() => reportsPath?.()}
      baseModule={GENERIC_REPORT_MODULES?.SALES}
      permissions={[
        AIR_OPERATION_REPORTS_SALES_FAVOURITES_PERMISSIONS?.RESTORE_RECORD,
        AIR_OPERATION_REPORTS_SALES_DASHBOARD_REPORTS_PERMISSIONS?.RESTORE_RECORD,
        AIR_OPERATION_REPORTS_SALES_ALL_REPORTS_PERMISSIONS?.RESTORE_RECORD,
      ]}
    />
  );
};
