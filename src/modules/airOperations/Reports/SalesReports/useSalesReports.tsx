import { AIR_OPERATIONS } from '@/constants';
import { useRouter } from 'next/router';
import { salesReportsListTabsDynamic } from './SalesReports.data';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';
import { PermissionTabsArrayI } from '@/components/Tabs/PermissionsTabs/PermissionsTabs.interface';
import { TAB_CHANGED_FILTERED } from '../ServicesReports/ServicesReports.data';
import {
  resetApiQueryParams,
  resetComponentState,
  setFilter,
} from '@/redux/slices/airOperations/reports/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';

export const useSalesReports = () => {
  const router = useRouter();
  const id = router?.query?.id;

  const canDisableTab = useAppSelector(
    (state) => state?.operationsReportsLists?.canDisableTab,
  );

  const dispatch = useAppDispatch();

  const moveToCreateReport = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.UPSERT_GENERIC_REPORTS,
      query: {
        moduleName: GENERIC_REPORT_MODULES?.SALES,
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

  const salesReportsListTabs: PermissionTabsArrayI[] =
    salesReportsListTabsDynamic(canDisableTab);

  useEffect(() => {
    return () => {
      dispatch(resetComponentState());
    };
  }, []);

  return {
    router,
    salesReportsListTabs,
    id,
    handleTabChange,
    moveToCreateReport,
    moveBack,
  };
};
