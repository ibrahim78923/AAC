import { useEffect, useMemo, useRef } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { useGetServicesDashboardSingleDashboardDetailsQuery } from '@/services/airServices/dashboard';
import { AIR_SERVICES } from '@/constants/routes';
import { AUTO_REFRESH_API_POLLING_TIME } from '@/config';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getActiveProductSession } from '@/utils';
import { resetSingleDashboardState } from '@/redux/slices/airServices/dashboard/slice';
import { API_STATUS_CODE } from '@/constants/api';
import {
  dashboardTicketBasedGraphTypeSelector,
  departmentWiseAgentSelector,
} from '@/redux/slices/airServices/dashboard/selectors';
import { useFormLib } from '@/hooks/useFormLib';
import {
  singleDashboardDefaultValues,
  singleDashboardValidationSchema,
} from './SingleDashboard.data';

export const useSingleDashboard = (props: any) => {
  const dispatch = useAppDispatch();
  const { dashboardId } = props;
  const downloadRef = useRef(null);
  const router: NextRouter = useRouter();

  const productId = useMemo(() => {
    const account = getActiveProductSession();
    return account?._id;
  }, []);

  const formLibProps = {
    validationSchema: singleDashboardValidationSchema,
    defaultValues: singleDashboardDefaultValues,
  };

  const { watch, methods } = useFormLib(formLibProps);

  const departmentWiseAgents = useAppSelector(departmentWiseAgentSelector);

  const ticketBasedGraphType = useAppSelector(
    dashboardTicketBasedGraphTypeSelector,
  );

  const apiDataParameter = {
    queryParams: {
      filterBy: ticketBasedGraphType,
      departmentId: departmentWiseAgents?._id,
      dashboardId:
        router?.query?.dashboardId ??
        dashboardId?._id ??
        watch?.('dashboardId')?._id,
      productId,
    },
  };

  const lazyGetSingleServicesDashboardStatus =
    useGetServicesDashboardSingleDashboardDetailsQuery?.(apiDataParameter, {
      refetchOnMountOrArgChange: true,
      pollingInterval: AUTO_REFRESH_API_POLLING_TIME?.DASHBOARD,
    });

  const moveToDashboard = () =>
    router?.push({
      pathname: AIR_SERVICES?.DASHBOARD,
    });

  const dashboardName =
    lazyGetSingleServicesDashboardStatus?.data?.data?.dashboard?.name;
  const reportsList =
    lazyGetSingleServicesDashboardStatus?.data?.data?.dashboard?.reports;
  const apiSuspenseState =
    lazyGetSingleServicesDashboardStatus?.isLoading ||
    lazyGetSingleServicesDashboardStatus?.isFetching;
  const hasError = lazyGetSingleServicesDashboardStatus?.isError;
  const hasDefaultDashboard =
    lazyGetSingleServicesDashboardStatus?.data?.statusCode ===
    API_STATUS_CODE?.[404];
  const refetchApi = lazyGetSingleServicesDashboardStatus?.refetch;

  useEffect(() => {
    return () => {
      dispatch(resetSingleDashboardState?.());
    };
  }, []);

  return {
    lazyGetSingleServicesDashboardStatus,
    methods,
    downloadRef,
    moveToDashboard,
    dashboardName,
    reportsList,
    apiSuspenseState,
    hasDefaultDashboard,
    hasError,
    refetchApi,
  };
};
