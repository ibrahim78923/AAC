import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PAGINATION } from '@/config';
import { useLazyGetSingleContractsActivityLogQuery } from '@/services/airServices/assets/contracts/single-contract-details/activity';
import { MODULE_TYPE } from '@/constants/strings';

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
      module: MODULE_TYPE?.CONTRACTS,
    },
  };

  const [trigger, { data, isLoading, isFetching, isError }]: any =
    useLazyGetSingleContractsActivityLogQuery();

  useEffect(() => {
    trigger(getSingleContractActivityParameter);
  }, [contractId, page, pageLimit]);

  return {
    isLoading,
    isError,
    isFetching,
    theme,
    data,
    setPage,
    setPageLimit,
  };
};
