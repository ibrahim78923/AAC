import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useServicesReports } from './useServicesReports';
import { AIR_OPERATIONS } from '@/constants';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { ReportLists } from '../ReportLists';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const ServicesReports = () => {
  const {
    router,
    restoreReportsPath,
    editReportPath,
    servicesReportsListTabs,
    tabsArrayData,
  } = useServicesReports();
  return (
    <>
      <PageTitledHeader
        title={'Reports'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_OPERATIONS?.REPORTS);
        }}
        addTitle="Create report"
        handleAction={() => {
          router?.push(AIR_OPERATIONS?.UPSERT_SERVICES_REPORTS);
        }}
      />
      <HorizontalTabs spacing={0.3} tabsDataArray={tabsArrayData}>
        {servicesReportsListTabs?.map((reportsTab: any) => (
          <PermissionsGuard
            permissions={Object?.values(reportsTab?.permissions)}
            key={reportsTab?._id}
          >
            <ReportLists
              apiQuery={reportsTab?.apiQuery}
              onRestoreClick={() => restoreReportsPath?.()}
              editReportPath={(id: any) => editReportPath?.(id)}
              exportApiQuery={reportsTab?.exportApiQuery}
              baseModule={GENERIC_REPORT_MODULES?.SERVICES}
              permission={reportsTab?.permissions}
            />
          </PermissionsGuard>
        ))}
      </HorizontalTabs>
    </>
  );
};
