import { AIR_OPERATIONS } from '@/constants';
import { useRouter } from 'next/router';
import { moduleReportsListTabsDynamic } from './ModuleReports.data';
import { PermissionTabsArrayI } from '@/components/Tabs/PermissionsTabs/PermissionsTabs.interface';
import {
  resetApiQueryParams,
  resetComponentState,
  setFilter,
} from '@/redux/slices/airOperations/reports/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { TAB_CHANGED_FILTERED } from '../ReportLists/ReportLists.data';

export const useModuleReports = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const baseModule = router?.query?.baseModule as string;

  const canDisableTab = useAppSelector(
    (state) => state?.operationsReportsLists?.canDisableTab,
  );

  const dispatch = useAppDispatch();

  const moveToCreateReport = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.UPSERT_GENERIC_REPORTS,
      query: {
        moduleName: baseModule,
        id,
        redirect: router?.pathname,
      },
    });
  };

  const moveBack = () => router?.push(AIR_OPERATIONS?.REPORTS);

  const handleTabChange = (tabValue: any) => {
    dispatch(
      setFilter<any>({ filter: TAB_CHANGED_FILTERED?.[tabValue], tabValue }),
    );
    dispatch(resetApiQueryParams?.());
  };

  const moduleReportsListTabs: PermissionTabsArrayI[] =
    moduleReportsListTabsDynamic(canDisableTab, baseModule);

  useEffect(() => {
    return () => {
      dispatch(resetComponentState());
    };
  }, []);

  return {
    router,
    moduleReportsListTabs,
    id,
    handleTabChange,
    moveToCreateReport,
    moveBack,
    baseModule,
  };
};
