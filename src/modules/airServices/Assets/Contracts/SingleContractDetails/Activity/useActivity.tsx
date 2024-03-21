import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { PAGINATION } from '@/config';
import { useGetSingleContractsActivityLogQuery } from '@/services/airServices/assets/contracts/single-contract-details/activity';
import { MODULE_TYPE } from '@/constants/strings';

export const useActivity = () => {
  const theme = useTheme();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const contractId = useSearchParams()?.get('contractId');

  const getSingleContractActivityParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      moduleId: contractId,
      module: MODULE_TYPE?.CONTRACTS,
    },
  };

  const { data, isLoading, isFetching, isError }: any =
    useGetSingleContractsActivityLogQuery(getSingleContractActivityParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!contractId,
    });

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
