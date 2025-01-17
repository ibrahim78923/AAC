import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { PAGINATION } from '@/config';
import { useGetSingleContractsActivityLogQuery } from '@/services/airServices/assets/contracts/single-contract-details/activity';
import { ACTIVITY_LOGS_MODULE } from '@/constants/activity-logs';

export const useActivity = () => {
  const theme = useTheme();
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);

  const contractId = useSearchParams()?.get('contractId');

  const getSingleContractActivityParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      moduleId: contractId,
      module: ACTIVITY_LOGS_MODULE?.CONTRACTS,
    },
  };

  const { data, isLoading, isError, isFetching, refetch } =
    useGetSingleContractsActivityLogQuery(getSingleContractActivityParameter, {
      refetchOnMountOrArgChange: true,
    });

  return {
    isLoading,
    isError,
    isFetching,
    theme,
    data,
    setPage,
    setPageLimit,
    refetch,
  };
};
