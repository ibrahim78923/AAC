import {
  AIR_OPERATION_REPORTS_SERVICES_ALL_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SERVICES_DASHBOARD_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SERVICES_FAVOURITES_PERMISSIONS,
} from '@/constants/permission-keys';
import { RestoreReportsLists } from '../../RestoreReportsLists';
import { useServicesReportsRestore } from './useServicesReportsRestore';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';

export const ServicesReportsRestore = () => {
  const { apiQueryAllReports, reportsPath } = useServicesReportsRestore();

  return (
    <RestoreReportsLists
      apiQuery={apiQueryAllReports}
      goBack={() => reportsPath?.()}
      baseModule={GENERIC_REPORT_MODULES?.SERVICES}
      permissions={[
        AIR_OPERATION_REPORTS_SERVICES_FAVOURITES_PERMISSIONS?.RESTORE_RECORD,
        AIR_OPERATION_REPORTS_SERVICES_DASHBOARD_REPORTS_PERMISSIONS?.RESTORE_RECORD,
        AIR_OPERATION_REPORTS_SERVICES_ALL_REPORTS_PERMISSIONS?.RESTORE_RECORD,
      ]}
    />
  );
};
