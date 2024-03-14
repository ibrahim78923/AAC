import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useGetSingleContractByIdQuery } from '@/services/airServices/assets/contracts';

export const useActivity = () => {
  const theme = useTheme();
  const contractId = useSearchParams()?.get('contractId');

  const getSingleContractParameter = {
    pathParam: {
      contractId,
    },
  };

  const { data, isLoading, isFetching, isError }: any =
    useGetSingleContractByIdQuery(getSingleContractParameter, {
      skip: !!!contractId,
    });

  const contractHistory = data?.data?.history;
  return {
    isLoading,
    isError,
    isFetching,
    theme,
    contractHistory,
  };
};
