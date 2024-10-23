import { useRef, useState } from 'react';
import { TICKET_GRAPH_TYPES } from '@/constants/strings';
import { NextRouter, useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useAuth from '@/hooks/useAuth';
import { useGetServicesDashboardSingleDashboardDetailsQuery } from '@/services/airServices/dashboard';
import { AIR_SERVICES } from '@/constants/routes';
import { AUTO_REFRESH_API_POLLING_TIME } from '@/config';

export const useSingleDashboard = (props: any) => {
  const { dashboardId } = props;
  const downloadRef = useRef(null);
  const router: NextRouter = useRouter();
  const [ticketType, setTicketType] = useState(TICKET_GRAPH_TYPES?.STATUS);
  const [departmentId, setDepartmentId] = useState<any>(null);

  const auth: any = useAuth();
  const productId = auth?.product?._id ?? {};

  const methods = useForm({
    defaultValues: { dashboardId: null },
    resolver: yupResolver(
      Yup?.object()?.shape({
        dashboardId: Yup?.mixed()?.nullable(),
      }),
    ),
  });

  const { watch } = methods;

  const apiDataParameter = {
    queryParams: {
      filterBy: ticketType,
      departmentId: departmentId?._id,
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

  return {
    lazyGetSingleServicesDashboardStatus,
    ticketType,
    setTicketType,
    departmentId,
    setDepartmentId,
    router,
    methods,
    downloadRef,
    moveToDashboard,
    dashboardName,
    reportsList,
    apiSuspenseState,
  };
};
