import { useGetSingleServicesDashboardQuery } from '@/services/airServices/dashboard';
import { useRef, useState } from 'react';
import { TICKET_GRAPH_TYPES } from '@/constants/strings';
import { NextRouter, useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useAuth from '@/hooks/useAuth';

export const useSingleDashboard = (props: any) => {
  const { dashboardId } = props;
  const downloadRef = useRef(null);
  const router: NextRouter = useRouter();
  const [ticketType, setTicketType] = useState(TICKET_GRAPH_TYPES?.STATUS);
  const [departmentId, setDepartmentId] = useState<any>(null);
  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};

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
    useGetSingleServicesDashboardQuery?.(apiDataParameter, {
      refetchOnMountOrArgChange: true,
    });

  return {
    lazyGetSingleServicesDashboardStatus,
    ticketType,
    setTicketType,
    departmentId,
    setDepartmentId,
    router,
    methods,
    downloadRef,
  };
};
