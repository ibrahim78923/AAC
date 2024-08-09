import { useTheme } from '@mui/material';
import {
  useGetDashboardCardsTicketsQuery,
  useLazyGetSingleServicesDashboardQuery,
} from '@/services/airServices/dashboard';
import { useEffect, useState } from 'react';
import { TICKET_GRAPH_TYPES } from '@/constants/strings';
import { useRouter } from 'next/router';

export const useSingleDashboard = (props: any) => {
  const { dashboardId, setApiLoader } = props;
  const router = useRouter();
  const [ticketType, setTicketType] = useState(TICKET_GRAPH_TYPES?.STATUS);
  const [departmentId, setDepartmentId] = useState<any>(null);

  const [
    lazyGetSingleServicesDashboardTrigger,
    lazyGetSingleServicesDashboardStatus,
  ] = useLazyGetSingleServicesDashboardQuery();

  const theme = useTheme();
  const {
    data: cardsData,
    isLoading,
    isFetching,
  } = useGetDashboardCardsTicketsQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const cardData = cardsData?.data;

  const getSingleDashboardData = async () => {
    const apiDataParameter = {
      queryParams: {
        filterBy: ticketType,
        departmentId: departmentId?._id,
        dashboardId: router?.query?.dashboardId ?? dashboardId?._id,
      },
    };

    try {
      await lazyGetSingleServicesDashboardTrigger(apiDataParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    setApiLoader?.(lazyGetSingleServicesDashboardStatus);
  }, [lazyGetSingleServicesDashboardStatus]);

  useEffect(() => {
    getSingleDashboardData?.();
  }, [ticketType, departmentId?._id, dashboardId]);

  return {
    theme,
    cardData,
    isLoading,
    isFetching,
    lazyGetSingleServicesDashboardStatus,
    ticketType,
    setTicketType,
    departmentId,
    setDepartmentId,
    router,
  };
};
