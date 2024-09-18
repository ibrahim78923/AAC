import { AIR_OPERATIONS } from '@/constants';
import { useRouter } from 'next/router';
import { marketingReportsListTabsDynamic } from './MarketingReports.data';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';
import { PermissionTabsArrayI } from '@/components/Tabs/PermissionsTabs/PermissionsTabs.interface';
import {
  resetApiQueryParams,
  resetComponentState,
  setFilter,
} from '@/redux/slices/airOperations/reports/slice';
import { TAB_CHANGED_FILTERED } from '../ServicesReports/ServicesReports.data';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';

export const useMarketingReports = () => {
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
        moduleName: GENERIC_REPORT_MODULES?.MARKETING,
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

  const marketingReportsListTabs: PermissionTabsArrayI[] =
    marketingReportsListTabsDynamic(canDisableTab);

  useEffect(() => {
    return () => {
      dispatch(resetComponentState());
    };
  }, []);

  return {
    router,
    marketingReportsListTabs,
    id,
    handleTabChange,
    moveToCreateReport,
    moveBack,
  };
};
