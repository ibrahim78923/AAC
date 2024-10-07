import { useRef, useState } from 'react';
import { TICKET_GRAPH_TYPES } from '@/constants/strings';
import { NextRouter, useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useAuth from '@/hooks/useAuth';
import { useGetServicesDashboardSingleDashboardDetailsQuery } from '@/services/airServices/dashboard';
import { AIR_SERVICES } from '@/constants';

const { DASHBOARD } = AIR_SERVICES ?? {};
const { STATUS } = TICKET_GRAPH_TYPES ?? {};

export const useSingleDashboard = (props: any) => {
  const { dashboardId } = props;
  const downloadRef = useRef(null);
  const router: NextRouter = useRouter();
  const [ticketType, setTicketType] = useState(STATUS);
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
    });

  const moveToDashboard = () =>
    router?.push({
      pathname: DASHBOARD,
    });

  const dashboardName =
    lazyGetSingleServicesDashboardStatus?.data?.data?.dashboard?.name;
  const reportsList =
    lazyGetSingleServicesDashboardStatus?.data?.data?.dashboard?.reports;
  const apiSuspenstState =
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
    apiSuspenstState,
  };
};
