import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useModuleReports } from './useModuleReports';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { CREATE_REPORT_PERMISSIONS } from './ModuleReports.data';

export const ModuleReports = () => {
  const {
    moduleReportsListTabs,
    handleTabChange,
    moveToCreateReport,
    moveBack,
    baseModule,
  } = useModuleReports();

  return (
    <>
      <PageTitledHeader
        title={'Reports'}
        canMovedBack
        moveBack={moveBack}
        addTitle="Create report"
        handleAction={moveToCreateReport}
        createPermissionKey={CREATE_REPORT_PERMISSIONS?.[baseModule] ?? []}
      />
      <PermissionsTabs
        spacing={0.3}
        tabsDataArray={moduleReportsListTabs}
        handleTabChange={handleTabChange}
      />
    </>
  );
};
