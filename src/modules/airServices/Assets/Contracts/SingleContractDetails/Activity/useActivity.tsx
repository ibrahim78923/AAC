import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { PAGINATION } from '@/config';
import { MODULE_TYPE } from '@/constants/strings';
import { useGetActivityLogQuery } from '@/services/airServices/assets/contracts/single-contract-details/activity';

export const useActivity = () => {
  const theme = useTheme();
  const contractId = useSearchParams()?.get('contractId');

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const { data, isLoading, isError, isFetching } = useGetActivityLogQuery(
    {
      page,
      limit: pageLimit,
      moduleId: contractId,
      module: MODULE_TYPE?.CONTRACTS,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  return {
    isLoading,
    isError,
    setPageLimit,
    setPage,
    isFetching,
    theme,
    data,
  };
};
