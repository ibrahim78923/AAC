import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';
import { useGetPlanMangementQuery } from '@/services/superAdmin/plan-mangement';
import {
  TABLE_CONSTANTS,
  PlanDetailsDataColumnFunction,
} from './PlanDetails.data';

export const usePlanDetails = (filterValues: any, searchBy: any) => {
  const theme = useTheme();
  const router = useRouter();

  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetPlanMangementQuery({ params: searchBy });
  const [ticketsListsColumn, seTTicketsListsColumn] = useState(
    PlanDetailsDataColumnFunction(theme, router),
  );

  return {
    ticketsListsColumn,
    tableRowData: data?.data?.plans,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    router,
    TABLE_CONSTANTS,
    seTTicketsListsColumn,
  };
};
