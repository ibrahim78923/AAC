import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';
import { useMarketingReports } from './useMarketingReports';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { ReportLists } from '../ReportLists';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const MarketingReports = () => {
  const {
    router,
    restoreReportsPath,
    editReportPath,
    marketingReportsListTabs,
    tabsArrayData,
  } = useMarketingReports();

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
          router?.push(AIR_OPERATIONS?.UPSERT_MARKETING_REPORTS);
        }}
      />
      <HorizontalTabs spacing={0.3} tabsDataArray={tabsArrayData}>
        {marketingReportsListTabs?.map((reportsTab: any) => (
          <PermissionsGuard
            permissions={Object?.values(reportsTab?.permissions)}
            key={reportsTab?._id}
          >
            <ReportLists
              apiQuery={reportsTab?.apiQuery}
              onRestoreClick={() => restoreReportsPath?.()}
              editReportPath={(id: any) => editReportPath?.(id)}
              exportApiQuery={reportsTab?.exportApiQuery}
              baseModule={GENERIC_REPORT_MODULES?.MARKETING}
              permission={reportsTab?.permissions}
            />
          </PermissionsGuard>
        ))}
      </HorizontalTabs>
    </>
  );
};
