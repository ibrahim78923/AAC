import { useEffect, useMemo, useRef } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useGetServicesDashboardSingleDashboardDetailsQuery } from '@/services/airServices/dashboard';
import { AIR_SERVICES } from '@/constants/routes';
import { AUTO_REFRESH_API_POLLING_TIME } from '@/config';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getActiveProductSession } from '@/utils';
import { resetSingleDashboardState } from '@/redux/slices/airServices/dashboard/slice';

export const useSingleDashboard = (props: any) => {
  const dispatch = useAppDispatch();
  const { dashboardId } = props;
  const downloadRef = useRef(null);
  const router: NextRouter = useRouter();

  const productId = useMemo(() => {
    const account = getActiveProductSession();
    return account?._id;
  }, []);

  const methods = useForm({
    defaultValues: { dashboardId: null },
    resolver: yupResolver(
      Yup?.object()?.shape({
        dashboardId: Yup?.mixed()?.nullable(),
      }),
    ),
  });

  const { watch } = methods;

  const departmentWiseAgents = useAppSelector(
    (state) => state?.servicesDashboard?.departmentWiseAgent,
  );

  const ticketBasedGraphType = useAppSelector(
    (state) => state?.servicesDashboard?.ticketBasedGraphType,
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
  };
};
