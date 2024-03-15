import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useGetSingleContractByIdQuery } from '@/services/airServices/assets/contracts';
import { useState } from 'react';
import { PAGINATION } from '@/config';

export const useActivity = () => {
  const theme = useTheme();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const contractId = useSearchParams()?.get('contractId');

  const getSingleContractParameter = {
    pathParam: {
      contractId,
      page,
      limit: pageLimit,
    },
  };

  const { data, isLoading, isFetching, isError }: any =
    useGetSingleContractByIdQuery(getSingleContractParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!contractId,
    });

  const contractHistory = data?.data?.history;
  return {
    isLoading,
    isError,
    isFetching,
    theme,
    contractHistory,
    setPage,
    setPageLimit,
  };
};
