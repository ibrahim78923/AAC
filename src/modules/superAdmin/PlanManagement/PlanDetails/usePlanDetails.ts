import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';
import { useGetPlanMangementQuery } from '@/services/superAdmin/plan-mangement';
import {
  TABLE_CONSTANTS,
  PlanDetailsDataColumnFunction,
} from './PlanDetails.data';

export const usePlanDetails = (params: any) => {
  const theme = useTheme();
  const router = useRouter();

  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetPlanMangementQuery({ params: params });
  const [ticketsListsColumn, seTTicketsListsColumn] = useState(
    PlanDetailsDataColumnFunction(theme, router),
  );

  return {
    ticketsListsColumn,
    tableRowData: data,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    router,
    TABLE_CONSTANTS,
    seTTicketsListsColumn,
  };
};
