import { AIR_OPERATIONS } from '@/constants';
import { useRouter } from 'next/router';
import {
  TAB_CHANGED_FILTERED,
  servicesReportsListTabsDynamic,
} from './ServicesReports.data';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';
import { PermissionTabsArrayI } from '@/components/Tabs/PermissionsTabs/PermissionsTabs.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  resetApiQueryParams,
  resetComponentState,
  setFilter,
} from '@/redux/slices/airOperations/reports/slice';
import { useEffect } from 'react';

export const useServicesReports = () => {
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
        moduleName: GENERIC_REPORT_MODULES?.SERVICES,
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

  useEffect(() => {
    return () => {
      dispatch(resetComponentState());
    };
  }, []);

  const servicesReportsListTabs: PermissionTabsArrayI[] =
    servicesReportsListTabsDynamic(canDisableTab);

  return {
    router,
    servicesReportsListTabs,
    id,
    handleTabChange,
    moveToCreateReport,
    moveBack,
  };
};
